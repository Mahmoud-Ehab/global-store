import { ConstructiveView } from "sfawd";
import { HTMLView, HTMLAnimator } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";

import { ImageView } from "../mini-components/ImageView";
import { getImageSliderStyle } from "../../static/styles/ImageSliderStyle";

import { FadeIn } from "../../static/animations/FadeIn";
import { FadeOut } from "../../static/animations/FadeOut";
import { SlideFromLeft } from "../../static/animations/SlideFromLeft";
import { SlideToLeft } from "../../static/animations/SlideToLeft";

export class ImagesSlider extends ConstructiveView<HTMLView> {
  private loop: boolean;
  private images: ImageView[];
  private dur: number;

  constructor(id: string, images: ImageView[], dur: number, style?: Partial<CSSStyleDeclaration>, fitWidth?: boolean) {
    super(new HTMLView(
      {
        id, 
        parentId: "", 
      }, 
      {...getImageSliderStyle(), ...style}, 
      GlobalDrawers.div()
    ));

    images.forEach((image) => {
      image.myView().setStyle({
        position: "absolute",
        width: fitWidth ? "100%" : "auto",
        height: fitWidth ? "auto" : "100%",
        ...SlideFromLeft.from
      });
      image.setAnimator(new HTMLAnimator());
      this.addView(image);
    });

    this.images = images;
    this.dur = dur;
  }

  play() {
    this.loop = true;
    this.animateImages(-1);
  }

  stop() {
    this.loop = false;
  }

  private animateImages(i: number) {
    let invokeDelay: number = 0;

    if (i >= 0)
      invokeDelay = this.dur;
    else
      i = 0;

    setTimeout(() => {
      this.images[i].animate(SlideFromLeft);
      this.images[i].animate(FadeIn);

      this.images[i].animateTo({
        ...SlideToLeft,
        durs: [this.dur]
      });
      this.images[i].animateTo({
        ...FadeOut,
        durs: [this.dur]
      });

      if (!this.loop)
        return;
      else if (i === this.images.length-1)
        this.animateImages(0);
      else
        this.animateImages(i+1);
    }, invokeDelay);
  }
}

