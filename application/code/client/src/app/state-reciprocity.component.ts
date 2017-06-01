import {Component} from "@angular/core";
import {ClientConfig} from "./shared/utility/angular-client.utility";
import {StateReciprocityApi} from "./shared/angular-client/services/custom/StateReciprocity";
import {BaseComponent} from "./base.component";
import {ComponentSubscriberUtility} from "./shared/utility/component-subscriber-utility";

@Component({
  selector: 'my-app',
  templateUrl: './state-reciprocity.component.html',
  providers: [ClientConfig]
})
export class StateReciprocityComponent extends BaseComponent {

  constructor(protected clientConfig: ClientConfig, private stateReciprocityApi: StateReciprocityApi) {
    super(clientConfig);

    var utility: ComponentSubscriberUtility = new ComponentSubscriberUtility(this);
    utility.subscribe(stateReciprocityApi.find());

  };

}
