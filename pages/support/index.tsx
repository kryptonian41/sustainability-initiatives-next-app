import HeroImage from "components/About/Hero/HeroImage";
import { Container } from "components/Container";
import React from "react";

const Support = () => {
  return (
    <div className="mt-12">
      <HeroImage bgImgSrc="images/support.jpg" heading="Support" />
      <Container>
        <div className="my-12 laptop:grid laptop:grid-cols-2 laptop:gap-12">
          <div>
            <p>
              We at Sustainability Initiatives conduct policy research in the
              areas of sustainable governance, urban and environment planning
              with an aim to bring a positive change in the urban development
              pattern. We collaborate with expert professionals for identifying
              current gaps and conduct relevant researches and studies in the
              area of Sustainable Urban Development. This research is no less
              than any professional research involving background study,
              literature review, research design and methodology with theory of
              change, primary and secondary data collection and analysis,
              stakeholder consultations and finally the report writing. This
              scientifically conducted research strongly support our advocacy
              initiatives.
            </p>
          </div>
          <div>
            <p>
              We intend to make this a social movement and create an
              environmentally responsible society.
            </p>
            <br />
            <p>
              Such studies require significant amount of funds which we cannot
              manage on our own hence need your support! The support can be in
              terms of your valuable time, your subject expertise, access to
              your networks or monetary support for doing this socially relevant
              work.
            </p>
            <br />
            <p>
              Kindly write to us at{" "}
              <span className="font-bold">
                mail@sustainability-initiatives.org
              </span>{" "}
              if you would like to contribute and support our activities!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Support;
