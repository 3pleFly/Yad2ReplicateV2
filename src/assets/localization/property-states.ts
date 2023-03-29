import { TranslationType } from "src/app/shared/models/translation-type.interface";


export const propertyStates: TranslationType = {
  NewFromContractor: 'חדש מקבלן (לא גרו בו בכלל)',
  NewUpTo5Years: 'חדש (נכס בן עד 5 שנים)',
  Renovated: 'משופץ (שופץ ב5 שנים האחרונות)',
  GoodCondition: 'במצב שמור (במצב טוב, לא שופץ)',
  RequiredRenovation: 'דרוש שיפוץ (זקוק לעבודת שיפוץ)'
}
