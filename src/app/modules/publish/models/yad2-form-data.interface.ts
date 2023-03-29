export interface IRealestateForm {
  [key: string]: any;
  step1: {
    listingId: null | number;
    boardId: null | number;
  };
  step2: {
    propertyTypeId: null | number;
    propertyStateId: null | number;
    city: null | string;
    street: null | string;
    houseNum: null | string;
    neighborhood: null | string;
    areaOfLiving: null | string;
    floor: null | number;
    totalFloors: null | number;
    isOnColumns: null | boolean;
  };
  step3: {
    rooms: null | number;
    parkings: null | number;
    balconies: null | number;
    propertyFeaturesIds: null | number[];
    description: null | string;
  };
  step4: {
    squareMeter: null | number;
    gardenSquareMeter: null | number;
    totalSquareMeter: null | number;
    price: null | number;
    entryDate: null | Date;
    isImmediateEntryDate: null | boolean;
    isFlexibleEntryDate: null | boolean;
  };
  step5: {};
  step6: {
    contactName: null | string;
    phoneNumber: null | string;
    secondContactName: null,
    secondContactPhoneNumber: null,
    acceptTerms: null,
    useVirtualNumber: null | boolean;
    allowCallsOnWeekends: null | boolean;
    allowCommercials: null | boolean;
  };
  step7: {
    advertisementTypeId: number | null
  };
}

export type RealestateFormStep =
  | IRealestateForm['step1']
  | IRealestateForm['step2']
  | IRealestateForm['step3']
  | IRealestateForm['step4']
  | IRealestateForm['step5']
  | IRealestateForm['step6']
  | IRealestateForm['step7'];
