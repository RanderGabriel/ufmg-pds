<template>
    <div class="ml-2 mr-2 mx-2">
        <form>
            <div class="mb-5">
                <div class="field">
                    <label class="label">Informe seu e-mail para recuperação</label>
                    <div class="control">
                        <input class="input" type="text">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <input name="user" type="radio" value="DRIVER" > Sou motorista
                        <input name="user" type="radio" value="MECHANIC" > Sou mecânico
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