import DriverHome from '@/views/home/driver.vue';
import { mount } from '@vue/test-utils'


test('Displays form', () => {
    const wrapper = mount(DriverHome, {   
    });

    expect(wrapper.html()).toContain("ENVIAR SOLICITAÇÃO");
});