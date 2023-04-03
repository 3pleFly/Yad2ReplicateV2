import { PropertyFeatures } from 'src/app/core/models/property-features.interface';
import { TranslationType } from 'src/app/shared/models/translation-type.interface';

export const propertyFeaturesLocalisation: TranslationType = {
  Accessability: 'נגישה לנכים',
  AC: 'מזגן',
  WindowBars: 'סורגים',
  WaterHeating: 'דוד שמש',
  Elevator: 'מעלית',
  Roommates: 'לשותפים',
  Furniture: 'מרוהטת',
  Unit: 'יחידת דיור',
  KosherKitchen: 'מטבח כשר',
  Pets: 'חיות מחמד',
  Renovated: 'משופצת',
  Mamad: 'ממ״ד',
  TadiranAC: 'מזגן תדיראן',
  Storage: 'מחסן',
};

export const propertyFeaturesImgSrcs: PropertyFeatures = {
  AC: 'assets/pictures/property-features/ac.png',
  Accessability: 'assets/pictures/property-features/disabled-access.png',
  Elevator: 'assets/pictures/property-features/elevator.png',
  Furniture: 'assets/pictures/property-features/furniture.png',
  KosherKitchen: 'assets/pictures/property-features/kosher-kitchen.png',
  Mamad: 'assets/pictures/property-features/mamad.png',
  Pets: 'assets/pictures/property-features/pets.png',
  Renovated: 'assets/pictures/property-features/renovated.png',
  Roommates: 'assets/pictures/property-features/roommates.png',
  Storage: 'assets/pictures/property-features/storage.png',
  TadiranAC: 'assets/pictures/property-features/tadiran-ac.png',
  Unit: 'assets/pictures/property-features/unit.png',
  WaterHeating: 'assets/pictures/property-features/water-heater.png',
  WindowBars: 'assets/pictures/property-features/window-bars.png',
};
