import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../campaign';
import {Card, Grid, Button} from 'semantic-ui-react';
import web3 from '../../web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props){
        const address = props.query.address
        const campaign = Campaign(address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address,
            minimumContribution: summary['0'],
            balance: summary['1'],
            requestsCount: summary['2'],
            approversCount: summary['3'],
            manager: summary['4']
        }
    }
    renderCard() {
        const {
            balance,
            manager, 
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props
        
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to the campaign.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver.'
            },
            {
                header: requestsCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the campaign',
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of people who have already donated to the campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.'
            },
        ];

        return <Card.Group items={items}/>;
    }
    render(){
        return (
            <Layout>
                <Grid>
                    <Grid.Column width={10}>
                        <h3>Address  of the campaign: {this.props.address}</h3>
                        {this.renderCard()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;