import React from "react";
import Image from "next/image";
import Modal from "react-modal";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";

export default function ProductGallery({
  product,
  selectedImageIndex,
  setSelectedImageIndex,
  isImageModalOpen,
  handleImageClick,
  closeImageModal,
  showPrevImage,
  showNextImage,
  galleryStyles,
}) {
  const {
    GalleryCard,
    MainImage,
    ThumbGrid,
    ThumbButton,
    FullscreenImageContainer,
    FullscreenImage,
    NavigationButton,
    CloseButton,
  } = galleryStyles;

  if (!product) {
    return null;
  }

  return (
    <>
      <GalleryCard>
        <MainImage
          src={product.images[selectedImageIndex]}
          alt={`${product.title} - ${selectedImageIndex + 1}`}
          onClick={() => handleImageClick(selectedImageIndex)}
        />
        <ThumbGrid>
          {product.images.map((image, index) => (
            <ThumbButton
              key={index}
              type="button"
              active={selectedImageIndex === index}
              onClick={() => setSelectedImageIndex(index)}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
            >
              <Image
                className="thumb-image"
                src={image}
                alt={`${product.title} miniatura ${index + 1}`}
                width={120}
                height={120}
                unoptimized
              />
            </ThumbButton>
          ))}
        </ThumbGrid>
      </GalleryCard>

      {isImageModalOpen && (
        <Modal
          isOpen={isImageModalOpen}
          onRequestClose={closeImageModal}
          contentLabel="Fullscreen Image Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            content: {
              backgroundColor: "transparent",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <FullscreenImageContainer>
            <NavigationButton
              side="left"
              type="button"
              onClick={showPrevImage}
              aria-label="Poprzednie zdjęcie"
            >
              <MdChevronLeft />
            </NavigationButton>
            <FullscreenImage
              src={product.images[selectedImageIndex]}
              alt={`${product.title} - ${selectedImageIndex + 1}`}
            />
            <NavigationButton
              side="right"
              type="button"
              onClick={showNextImage}
              aria-label="Następne zdjęcie"
            >
              <MdChevronRight />
            </NavigationButton>
            <CloseButton
              type="button"
              onClick={closeImageModal}
              aria-label="Zamknij podgląd zdjęcia"
            >
              <MdClose />
            </CloseButton>
          </FullscreenImageContainer>
        </Modal>
      )}
    </>
  );
}
