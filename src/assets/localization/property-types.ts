import { TranslationType } from "src/app/shared/models/translation-type.interface";

export const propertyTypes: TranslationType = {
  Apartment: 'דירה',
  GardenApartment: 'דירת גן',
  RoofOrPenthouse: 'גג/פנטהאוז',
  Duplex: 'דופלקס',
  VacationHouse: 'דירת נופש',
  Basement: 'מרתף/פרטר',
  Triplex: 'טריפלקס',
  Unit: 'יחידת דיור',
  Studio: 'סטודיו',

  PrivateHouseOrCottege: 'בית פרטי/קוטג׳',
  Townhouse: 'דו משפחתי',
  AgriculturalFarm: 'משק חקלאי',
  Farm: 'משק עזר',

  Lots: 'מגרשים',
  AssistedLiving: 'דיור מוגן',
  Building: 'בניין מגורים',
  Storage: 'מחסן',
  Parking: 'חניה',
  PurchasingGroup: 'קבוצת רכישה/זכות לנכס',
  General: 'כללי',

  select_apartments: 'דירות',
  select_houses: 'בתים',
  select_moreTypes: 'סוגים נוספים',
};
