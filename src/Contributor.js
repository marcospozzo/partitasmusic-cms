import { useParams } from "react-router-dom";
import ContributorEdit from "./ContributorEdit";
import Pieces from "./Pieces";

export default function Contributor() {
  const { path } = useParams();
  return (
    <div className="contributor">
      <ContributorEdit path={path} />
      <Pieces path={path} />
    </div>
  );
}
