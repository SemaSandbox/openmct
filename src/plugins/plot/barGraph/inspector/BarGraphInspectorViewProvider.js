import { BAR_GRAPH_INSPECTOR_KEY, BAR_GRAPH_KEY } from '../BarGraphConstants';
import Vue from 'vue';
import Options from "./Options.vue";

export default function BarGraphInspectorViewProvider(openmct) {
    return {
        key: BAR_GRAPH_INSPECTOR_KEY,
        name: 'Bar Graph Inspector View',
        canView: function (selection) {
            if (selection.length === 0 || selection[0].length === 0) {
                return false;
            }

            let object = selection[0][0].context.item;

            return object
                && object.type === BAR_GRAPH_KEY;
        },
        view: function (selection) {
            let component;

            return {
                show: function (element) {
                    component = new Vue({
                        el: element,
                        components: {
                            Options
                        },
                        provide: {
                            openmct,
                            domainObject: selection[0][0].context.item
                        },
                        template: '<options></options>'
                    });
                },
                destroy: function () {
                    if (component) {
                        component.$destroy();
                        component = undefined;
                    }
                }
            };
        },
        priority: function () {
            return 1;
        }
    };
}
