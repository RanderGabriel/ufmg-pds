export default interface IForm<T> {
    isLoading: boolean;
    isSending: boolean;
    entity: T;
    onSubmit: () => void;
}