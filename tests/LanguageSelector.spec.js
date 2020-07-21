import { shallowMount, createLocalVue } from '@vue/test-utils';
import LanguageSelector from '@/components/LanguageSelector.vue';
import Vuex from 'vuex';
import GlobalStore from '@/store/GlobalStore.js'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('test1', () => {
    let actions;
    let state;
    let store;
    
    beforeEach(() => {
        state = {
            clicks: 2
        }
    
        actions = {
            moduleActionClick: jest.fn()
        }
    
        store = new Vuex.Store({
            modules: {
                GlobalStore: {
                    state,
                    actions,
                    // getters: GlobalStore.getters
                }
            }
        })
    })

    test('test 1 A OK', () => {
        expect(true).toBe(true);
    });

    test('test 1 B KO', async () => {
        // const wrapper = mount(LanguageSelector);
        const wrapper = shallowMount(LanguageSelector, { store, localVue });
        wrapper.setProps({'columnIndex': 1});

        await wrapper.vm.$nextTick();
        expect(wrapper.find('h1').text()).toBe('Select language 1:');
    });
});

// https://vue-test-utils.vuejs.org/guides/using-with-vuex.html
