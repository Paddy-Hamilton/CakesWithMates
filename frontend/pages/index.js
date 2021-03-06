import React from "react";
import PageLayout from "../components/PageLayout";
import CakeGrid from "../components/CakeGrid";
import CreateCakeBtn from "../components/CreateCakeBtn";
import EditCakeModal from "../components/EditCakeModal";
const Index = () => (
  <PageLayout>
    <CakeGrid />
    <CreateCakeBtn />
    <EditCakeModal />
  </PageLayout>
);

export default Index;
