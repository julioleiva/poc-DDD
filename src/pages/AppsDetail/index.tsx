import React from "react";
import { useParams } from "react-router-dom";
import { AppService } from "../../services/AppService";
import { IApplication } from "../../models/Application";

type ParamsType = {
  route: string;
  [key: string]: string | undefined;
}

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<ParamsType>();
  const [application, setApplication] = React.useState<IApplication | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const appService = React.useMemo(() => new AppService(), []);

  React.useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        if (id) {
          const appDetail = await appService.getApplicationById(id);
          setApplication(appDetail);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [id, appService]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!application) return <p>No se encontró la aplicación.</p>;

  return (
    <div>
      <h2>{application.title}</h2>
      <p>Ruta: {application.route}</p>
    </div>
  );
};

export default ApplicationDetail;
