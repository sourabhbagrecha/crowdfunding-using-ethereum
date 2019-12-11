import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../campaign';
import web3 from '../web3';
import { Router } from '../routes';

class ContributeForm extends Component{a
    state = {
        contribution: '',
        processing: false,
        errorMessage: ''
    }
    onSubmit = async (event) => {
        event.preventDefault();
        const address = this.props.address;
        const campaign = Campaign(this.props.address);
        this.setState({ processing: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.contribution, 'ether')
            });

            Router.replaceRoute(`/campaigns/${address}`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ processing: false, contribution: '' });
    }
    render() {
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label='ether'
                        labelPosition='right'
                        onChange={event => this.setState({ contribution: event.target.value })}
                    />
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button loading={this.state.processing} primary style={{ 'marginTop': '10px'}}>
                        Contribute!
                    </Button>
                </Form.Field>
            </Form>
        )
    }
}

export default ContributeForm;