import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { yad2Translate } from 'src/app/core/helpers/functions.helpers';
import { Yad2Resource } from 'src/app/core/models/yad2resource.interface';
import { ApiRequestService } from 'src/app/core/services/api-request.service';
import { LocalisationService } from 'src/app/core/services/localisation.service';
import { SessionService } from 'src/app/core/services/session.service';
import { CheckmarkList } from 'src/app/shared/models/checkmark-list.interface';
import { Checkmark } from 'src/app/shared/models/checkmark.interface';
import { Yad2Icon } from 'src/app/shared/models/yad2-icon.interface';

@Injectable()
export class RealestateDataService {
  private _sessionService = inject(SessionService);
  private _localService = inject(LocalisationService);
  private _propertyFeaturesImgSrcs = this._localService.propertyFeaturesImgSrcs;

  getPropertyFeaturesIcons(): Observable<Yad2Icon[]> {
    return this._sessionService.getPropertyFeatures().pipe(
      map((y2r) =>
        y2r.map(
          (y2r) =>
            <Yad2Icon>{
              id: y2r.id,
              name: y2r.name,
              imgSrc: this._propertyFeaturesImgSrcs[y2r.name],
            }
        )
      )
    );
  }

  getPropertyTypeById(propertyTypeId: number): Observable<Yad2Resource> {
    return this._sessionService.getPropertyTypes().pipe(
      map((pts) => {
        const propertyType = pts.find((pt) => pt.id === propertyTypeId);
        if (propertyType === undefined)
          throw new Error('Property state Id not found: ' + propertyTypeId);
        return propertyType;
      })
    );
  }

  getPropertyStateById(propertyStateId: number): Observable<Yad2Resource> {
    return this._sessionService.getPropertyStates().pipe(
      map((ps) => {
        const propertyState = ps.find((ps) => ps.id === propertyStateId);
        if (propertyState === undefined)
          throw new Error('Property state Id not found: ' + propertyStateId);
        return propertyState;
      })
    );
  }

  getPropertyTypesCheckmarkList(): Observable<CheckmarkList[]> {
    return this._sessionService.getPropertyTypes().pipe(
      yad2Translate(this._localService.y2Translatables),
      map((y2r) =>
        y2r.map((y2r) => {
          return {
            id: y2r.id,
            name: y2r.name,
            state: 'unchecked',
          } as Checkmark;
        })
      ),
      map((checkmarks: Checkmark[]) => this.generateCheckmarkLists(checkmarks))
    );
  }

  private generateCheckmarkLists(checkmarks: Checkmark[]) {
    const apartmentTypeCheckmarks: CheckmarkList = {
      title: {
        name: this._localService.propertyTypes['select_apartments'],
        state: 'unchecked',
      },
      checkmarks: [],
    };
    const houseTypeCheckmarks: CheckmarkList = {
      title: {
        name: this._localService.propertyTypes['select_houses'],
        state: 'unchecked',
      },
      checkmarks: [],
    };
    const otherTypeCheckmarks: CheckmarkList = {
      title: {
        name: this._localService.propertyTypes['select_moreTypes'],
        state: 'unchecked',
      },
      checkmarks: [],
    };

    for (const checkmark of checkmarks) {
      if (checkmark.id === undefined)
        throw new Error('Checkmark ID is undefined: ' + checkmark);

      switch (checkmark.id) {
        case 1:
        case 3:
        case 4:
        case 6:
        case 7:
        case 9:
        case 10:
        case 11:
        case 16:
          apartmentTypeCheckmarks.checkmarks.push(checkmark);
          break;

        case 2:
        case 8:
        case 12:
        case 13:
          houseTypeCheckmarks.checkmarks.push(checkmark);
          break;
        default:
          otherTypeCheckmarks.checkmarks.push(checkmark);
          break;
      }
    }

    return [
      apartmentTypeCheckmarks,
      houseTypeCheckmarks,
      otherTypeCheckmarks,
    ] as CheckmarkList[];
  }
}
