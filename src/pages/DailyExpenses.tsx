import React, { MouseEventHandler } from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DailyExpenses.css';

const expenseTypes: string[] = ["Housing/Maintenance","Food", "Transportation","Clothing","Medical","Household supplies","Personal","Education","Gifts","Entertainment"]
interface DailyExpenseForm {
    expense_type: string;
    expense_amount: string;
    expense_description: string;
}

export const DailyExpenses = () => {
    const [show, setShow] = useState(false)

    // For dynamic table data
    const [data, setData] = useState<DailyExpenseForm[]>([])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const appendData = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            let formData: DailyExpenseForm = {expense_type:"", expense_amount:"", expense_description:""}
            if (!event.currentTarget.form) {
                throw 'Error: The form field should not be null'
            }
            const select = event.currentTarget.form[0] as HTMLSelectElement
            if (select.selectedIndex == 0) {
                alert("Expense type has not been selected.")
                return
            }
            formData["expense_type"] = expenseTypes[select.selectedIndex-1]

            const amountInput = event.currentTarget.form[1] as HTMLInputElement
            if (isNaN(parseFloat(amountInput.value))) {
                alert("Expense amount is required and should be a number")
                return
            }
            formData["expense_amount"] = amountInput.value

            const descInput = event.currentTarget.form[2] as HTMLInputElement
            formData["expense_description"] = descInput.value
            console.log(formData)
            setData(data.concat([formData]))
            handleClose()
    }
    const submitData = () => {
        if (!data.length) {
            alert("Error: No expenses to submit")
            return
        }
        fetch("http://localhost:3001/api")
            .then(response => response.text())
            .then(text => console.log(text))
            .catch(error => console.log(error))
    }       

    return (
        <div className="page">
            <div className="buttons">
                <ButtonGroup>
                    <Button variant="primary" onClick={handleShow}>
                        Create an expense
                    </Button>
                    <Button variant="success" onClick={submitData}>
                        Submit expenses
                    </Button>
                </ButtonGroup>
            </div>

            <div className="description">
                <h4>Add/submit daily expenses here</h4>
                <p>Add any amount of expenses and click the submit button to save these daily expenses. The expenses added will be displayed in the table below before submitting.</p>
            </div>

            <div className="table">
                <h4>Daily Expenses</h4>
                <Table striped bordered hover size="med" variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, idx) => {
                            return (
                                <tr>
                                    <td>{idx+1}</td>
                                    <td>{d.expense_type}</td>
                                    <td>{d.expense_amount}</td>
                                    <td>{d.expense_description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            <Modal className="modal" show={show} onHide={handleClose} centered animation>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="daily_expense_form">
                        <Form.Group>
                            <Form.Select>
                                <option>Select an expense type</option>
                                {expenseTypes.map((etype) => <option>{etype}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Expense amount</Form.Label>
                            <Form.Control placeholder="Amount of expense (in $)"/>
                            <Form.Text muted>Your expense amount should be a float; the exact/approximate amount paid. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Expense description</Form.Label>
                            <Form.Control placeholder="Expense details"/>
                            <Form.Text muted>Short description of expense. This is an optional field.</Form.Text>
                        </Form.Group>
                        <Button variant="success" onClick={appendData}>
                            Add
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
}