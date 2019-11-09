import { State } from "../nails/core/state";
import { IComponent } from "../nails/interfaces/Component";

export class ShowcaseComponent implements IComponent {
    state: State
    selector: string

    constructor(state: State) {
        this.selector = 'showcase';
    }

    render() {
        /*html*/

        return `
        <div class="yield">
            <p>Hi, this is a template rendered with the router</p>
            {{whoami}}
            <p>below is a table</p>
            <table style="width:100%">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr n-for="let object of sample">
                    <td>{{object.name}}</td>
                    <td>{{object.lastname}}</td>
                    <td>{{whoami}}</td>
                </tr>
  
            </table>
        </div>`

    }
}