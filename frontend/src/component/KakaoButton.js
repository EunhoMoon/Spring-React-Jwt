import { Image } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import Kakao from "../../images/kakao_login_medium_narrow.png";

const KakaoButton = () => {
  return (
    <Button>
      <Image source={Kakao} />
    </Button>
  );
};

export default KakaoButton;
