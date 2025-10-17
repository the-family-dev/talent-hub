import { observer } from "mobx-react-lite";
import { Layout } from "./components/Layout";

const App = observer(() => {
  return (
    <div className="flex flex-row gap-4 p-8">
      <Layout />
    </div>
  );
});

export default App;
