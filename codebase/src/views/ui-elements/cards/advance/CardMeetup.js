import Avatar from "@components/avatar";
import { Calendar, MapPin } from "react-feather";
import AvatarGroup from "@components/avatar-group";
import { Card, CardTitle, CardBody, CardText, Media } from "reactstrap";
import illustration from "@src/assets/images/illustration/email.svg";

const CardMeetup = () => {
  const data = [
    {
      title: "Billy Hopkins",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-9.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Amy Carson",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-6.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Brandon Miles",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-8.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Daisy Weber",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Jenny Looper",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-20.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      meta: "+42",
    },
  ];

  return <Card className="card-developer-meetup"></Card>;
};

export default CardMeetup;
