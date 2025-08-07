import { useMutation } from '@tanstack/react-query';
import { useAlert } from '../alert';
import { ApiError } from '../errors';

function useApiCall<apiCallParamsT, apiCallDataT>(props: {
    apiCall: (params: apiCallParamsT) => Promise<apiCallDataT>;
    onSuccess?: (data: apiCallDataT) => void;
}) {
    const { displayAlert } = useAlert();

    const mutation = useMutation({
        mutationFn: props.apiCall,
        onSuccess: (data) => {
            if (props.onSuccess) {
                props.onSuccess(data);
            }
        },
        onError: (error) => {
            if (error instanceof ApiError) {
                displayAlert({
                    variant: 'error',
                    text: error.message,
                });
            }

            console.error(error);
        },
    });
    const perform = mutation.mutate;
    const isLoading = mutation.isPending;

    return { perform, isLoading, variables: mutation.variables };
}

export { useApiCall };
