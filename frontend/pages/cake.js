import SingleCake from "../components/SingleCake";
import PageLayout from "../components/PageLayout";
import { useRouter } from "next/router";
const CakePage = () => {
  const {
    query: { id }
  } = useRouter();
  return (
    <PageLayout>
      <SingleCake id={id} />
    </PageLayout>
  );
};

export default CakePage;
