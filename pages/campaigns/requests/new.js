import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from '../../../web3';
import Campaign from '../../../campaign';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
    static async getInitialProps(props){
        const { address } = props.query;
        return {address};
    }
    state = {
        description: '',
        amount: '',
        recipient: '',
        errorMessage: '',
        processing: false
    }
    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        const {description, amount, recipient} = this.state;
        this.setState({ errorMessage: '', processing: true })
        try {
            await campaign.methods
                .createRequest(description, web3.utils.toWei(amount, 'ether'), recipient)
                .send({ from: accounts[0] });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ processing: false });
    }
    render(){
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        Back
                    </a>
                </Link>
                <h3>Create a Request.</h3>
                <Form onSubmit={this.onSubmit} error={ !!this.state.errorMessage }>
                    <Form.Field>
                        <label>Description:</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount:</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.amount}
                            onChange={event => this.setState({ amount: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient:</label>
                        <Input
                            label="address"
                            labelPosition="right"
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage + ` Make sure you have MetaMask installed as an extension in your browser.`}
                        />
                    <Button loading={this.state.processing} primary>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;