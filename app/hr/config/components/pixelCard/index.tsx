import { useState } from "react";
import { Button } from "components";
import Image from "next/image";
import PixelModal from "../pixelModal";

import { PixelCardWrap } from "./style";

const PixelCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <PixelCardWrap>
      <div className="card_title">
        <h4>Pixels</h4>
        <Button onClick={() => setOpen(true)}>Edit pixel</Button>
      </div>
      <div>
        <Image src={"/search-analytic.png"} alt={""} width={110} height={110} />
      </div>

      <PixelModal open={open} setOpen={setOpen} />
    </PixelCardWrap>
  );
};

export default PixelCard;
