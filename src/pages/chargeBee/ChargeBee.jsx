import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFamily,
  fetchProducts,
  fetchServices,
  fetchAddons,
} from "src/redux/chargeBee/chargeBeeSlice";
import ChargeBeeFamily from "./chargeBeeFamily/ChargeBeeFamily";
import ChargeBeeProducts from "./chargeBeeProducts/ChargeBeeProducts";
import ChargeBeeServices from "./chargeBeeServices/ChargeBeeServices";
import ChargeBeeAddons from "./chargeBeeAddons/ChargeBeeAddons";
import Heading from "src/components/heading/Heading";

const ChargeBee = () => {
  const dispatch = useDispatch();
  const familyData = useSelector((state) => state.chargeBee.family);
  const productsData = useSelector((state) => state.chargeBee.products);
  const servicesData = useSelector((state) => state.chargeBee.services);
  const addonsData = useSelector((state) => state.chargeBee.addons);
  useEffect(() => {
    dispatch(fetchFamily());
    dispatch(fetchProducts());
    dispatch(fetchServices());
    dispatch(fetchAddons());
  }, [dispatch]);
  return (
    <>
      <Heading heading={"Charge-Bee"} />
      <>
        <ChargeBeeFamily familyData={familyData} />
        <br />
        <br />
        <ChargeBeeProducts productsData={productsData} />
        <br />
        <br />
        <ChargeBeeServices servicesData={servicesData} />
        <br />
        <br />
        <ChargeBeeAddons addonsData={addonsData} />
      </>
    </>
  );
};

export default ChargeBee;
