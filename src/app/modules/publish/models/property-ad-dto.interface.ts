export class PropertyAdDto {
  id?: number;

  boardId!: number;
  listingId!: number;
  advetisementTypeId!: number;

  propertyTypeId!: number;
  propertyStateId!: number;
  propertyFeaturesIds!: number[];
  city!: string;
  street!: string;
  houseNum!: string;
  neighborhood!: string;
  areaOfLiving!: string;
  floor!: number;
  totalFloors!: number;
  isOnColumns!: boolean;

  rooms!: number;
  parkings!: number;
  balconies!: number;
  description!: string;

  squareMeter!: number;
  gardenSquareMeter!: number;
  totalSquareMeter!: number;
  price!: number;
  entryDate!: Date;
  isImmediateEntryDate!: boolean;
  isFlexibleEntryDate!: boolean;

  contactName!: string;
  phoneNumber!: string;
  secondContactName!: null;
  secondContactPhoneNumber!: null;
  acceptTerms!: null;
  useVirtualNumber!: boolean;
  allowCallsOnWeekends!: boolean;
  allowCommercials!: boolean;

  constructor(init: Required<PropertyAdDto>) {}
}
