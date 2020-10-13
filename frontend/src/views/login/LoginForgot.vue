<template>
    <div class="forgot p-4">
        <form @submit.prevent="onSubmit()">
            <div class="mb-5">
                <div class="field">
                    <label class="label">Informe seu e-mail para recuperação</label>
                    <div class="control">
                        <input class="input" type="text">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input name="profile" type="radio" value="DRIVER" > Sou motorista
                        <input name="profile" type="radio" value="MECHANIC" > Sou mecânico
                    </div>
                </div>
            </div>
            <div>
                <button class="button is-primary has-text-weight-bold is-fullwidth" :class="{'is-loading': isSending}" type="submit" :disabled="isSending">
                    RECUPERAR
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { userService } from '@/services/UserService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'forgot',
    setup() {
        const isLoading = ref(false);
        const formData = ref({
            email: '',
            profile: 'DRIVER' as "DRIVER" | "MECHANIC",
        });

        async function onSubmit() {
            isLoading.value = true;
            await userService.create({
                email: formData.value.email,
                profile: formData.value.profile,
            });
            isLoading.value = false;
            router.push('/login-forgot');
        }

        return {
            formData,
            onSubmit,
        }
    }
});
</script>

<style lang="scss" scoped>

    .forgot {
    }

</style>
