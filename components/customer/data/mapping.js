import { Airbnb } from "../../../icons/airbnb";
import { Booking } from "../../../icons/booking";

export default function mapIcons(data) {
  return data.map((item) => {
    if (item.id % 2 === 1) {
      return { ...item, svg: <Airbnb /> };
    } else {
      return { ...item, svg: <Booking /> };
    }
  });
}
