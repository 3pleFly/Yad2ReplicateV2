export interface Trait {
  name: string;
  polarity: "positive" | "negative";
}

export interface Trial {
  advertisementTypeId: number;
  name: string;
  traits: Trait[];
  isReccommended: boolean;
  price: number;
  imgSrc: string;
  duration: number;

}
