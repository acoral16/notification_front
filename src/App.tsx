import {useMemo, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {DummyService} from './services/DummyService';
import {useCheckboxGroup} from "./hooks/useCheckboxGroup";

const TypesErrorMessage = Object.freeze({
    Empty_Message: 'Please write an message',
    Invalid_Categories: 'Please choice at least one category',
});

function App() {
    const checkboxGroup = useCheckboxGroup(useMemo(() => ['SPORT', 'MOVIE', 'FINANCE'], []))

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [messageIsInvalid, setMessageIsInvalid] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [queueMessages, setQueueMessages] = useState<string[]>([]);

    const onWriteMessage = async () => {
        // Verify that the user has been selected one a several categories
        if (checkboxGroup.allCheckboxUnselected()) {
            setMessageIsInvalid(true);
            setErrorMessage(TypesErrorMessage.Invalid_Categories);
            return;
        }

        // Verify that the user has written a message valid (Not empty)
        if (message === '') {
            setMessageIsInvalid(true);
            setErrorMessage(TypesErrorMessage.Empty_Message);
            return;
        }

        setMessageIsInvalid(false);
        setMessage('');
        // Simulate request to API
        await DummyService.writeMessage(checkboxGroup.concatCategory(), message);
        setQueueMessages((prevState) => [checkboxGroup.concatCategory() + " - " + message, ...prevState] as string[]);
    };

    const formatHistory = () => {
        return queueMessages.reduce((accumulator, current) => {
            accumulator += current + '\n';
            return accumulator;
        }, '');
    };

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center p-2 p-md-5 bg:gray-96">
            <div className="bg:gray-90 b:1px|solid|#CCC p-4 p-sm-5 r:1rem shadow w:26rem">
                {checkboxGroup.renderElements()}

                <div className="row mt-2">
                    <Form.Text>Message</Form.Text>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        value={message}
                        isInvalid={messageIsInvalid}
                        onChange={({target}) => setMessage(target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errorMessage}
                    </Form.Control.Feedback>
                </div>

                <div className="row my-2">
                    <div className="col-6">
                        <Button
                            className="col-12"
                            variant="danger"
                            onClick={() => setMessage('')}
                        >
                            Clear
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button
                            className="col-12"
                            variant="primary"
                            onClick={onWriteMessage}
                        >
                            Send
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <Form.Text>Log History</Form.Text>
                    <Form.Control as="textarea" rows={5} value={formatHistory()}
                                  readOnly={true}/>
                </div>
            </div>
        </div>
    );
}

export default App;
