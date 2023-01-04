import React, {ForwardedRef, useState} from "react";
import Form from "react-bootstrap/Form";

interface Props {
    name: string,
}

function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const Checkbox = React.forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    return (
        <Form.Check
            type="checkbox"
            ref={ref}
            data-sd-name={`[${capitalizeFirstLetter(props.name)}]`}
            label={capitalizeFirstLetter(props.name)}
            checked={isChecked}
            onChange={({target}) => setIsChecked(target.checked)}
        />
    )
})
