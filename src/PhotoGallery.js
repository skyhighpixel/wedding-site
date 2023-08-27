import React, { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Lightbox, { useLightboxState } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
// import slides from "./fakedata";
import { LazyLoadImage } from "react-lazy-load-image-component";

const cards = [
  {
    title: "Ceremony & Reception",
    set: "guests",
    img: "https://akweddingphotos.s3.ap-southeast-2.amazonaws.com/guests-lowres/032A5893.jpg",
  },
  {
    title: "Photobooth",
    set: "photobooth",
    img: "https://akweddingphotos.s3.ap-southeast-2.amazonaws.com/photobooth-lowres/20230812+-+Oz+Photo+Booths+-+Angela+and+Kieran_s+Wedding+-+Trendy+Booth+-+Individual+Photos+-+5.jpg",
  },
  {
    title: "Bride & Groom",
    set: "couplesphotos",
    img: "https://akweddingphotos.s3.ap-southeast-2.amazonaws.com/couplesphotos-lowres/032A6126.jpg",
  },
];

export default function PhotoGallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(-1);
  const [photoSets, setPhotoSets] = useState({});
  const [view, setView] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const f = async () => {
      async function fetchData(folder) {
        const res_promise = await fetch(
          `https://3frsl5q2h2.execute-api.ap-southeast-2.amazonaws.com/default/images/${folder}`
        );
        const { urls } = await res_promise.json();
        return urls;
      }

      const guests = await fetchData("guests");
      const photobooth = await fetchData("photobooth");
      const couplesphotos = await fetchData("couplesphotos");

      setIsLoading(false);
      setPhotoSets({
        guests,
        photobooth,
        couplesphotos,
      });
      setView("guests");
    };

    f();
  }, []);

  useEffect(() => {
    if (!!photoSets && !!view) {
      setPhotos(photoSets[view]);
    }
  }, [photoSets, view]);

  return (
    <>
      <section className="page-section photogallery-container" id="gallery">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase mb-2">
              Photo Gallery
            </h2>
          </div>

          {!isLoading ? (
            <div className="row cards-row">
              {cards.map((card) => {
                return (
                  <div className="col-4 col-md-4">
                    <div
                      className={`card ${view === card.set ? "active" : ""}`}
                      style={{ backgroundImage: `url('${card.img}')` }}
                      onClick={() => setView(card.set)}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p>{card.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {!isLoading && photos?.length ? (
            <ResponsiveMasonry key={view}>
              <Masonry key={view} gutter={"5px"}>
                {photos
                  ?.sort(function (a, b) {
                    return a.localeCompare(b, undefined, {
                      numeric: true,
                      sensitivity: "base",
                    });
                  })
                  .map((photo, i) => {
                    photo = photo?.replace(view, `${view}-lowres`);
                    return (
                      <LazyLoadImage
                        key={i}
                        src={photo}
                        onClick={() => setIndex(i)}
                      />
                    );
                  })}
              </Masonry>
            </ResponsiveMasonry>
          ) : null}

          {index !== -1 && !isLoading ? (
            <Lightbox
              key={photos.length}
              index={index}
              slides={photos.map((p) => {
                return { src: p, download: p };
              })}
              open={index >= 0}
              close={() => setIndex(-1)}
              plugins={[Share, Download]}
            />
          ) : null}
        </div>
      </section>
      <ScrollToTop smooth />
    </>
  );
}
