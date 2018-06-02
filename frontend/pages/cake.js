import SingleCake from '../components/SingleCake';
import PageLayout from '../components/PageLayout';
const CakePage = ({ query: { id } }) => {
  return (
    <PageLayout>
      <SingleCake id={id} />
    </PageLayout>
  );
};

export default CakePage;
