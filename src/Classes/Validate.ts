// declare var amp: any;
import { ValidateInterface, EditorListenerInterface } from '../Interfaces';

export class Validate implements ValidateInterface, EditorListenerInterface {
    
    private valid: boolean;

    getNewHtml(html: string) {
        this.valid = true;
        // How do I communicate the validity of the AMP HTML to the preact component?
        //amp.validator.validateString(html);
    }

}
