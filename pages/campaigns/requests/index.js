import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import {Button, Table} from 'semantic-ui-react';
import Campaign from '../../../campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component{
    static async getInitialProps(props){
        const {address} = props.query;
    
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        console.log('===========>>>>>>', approversCount);
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );
        return { address, requests, requestCount, approversCount };
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            const {description, value, recipient, approvalCount, complete} = request;

            return (
                <RequestRow
                    key={index} 
                    id={index} 
                    description={description} 
                    value={value} 
                    recipient={recipient} 
                    approvalCount={approvalCount} 
                    approversCount={this.props.approversCount}
                    address={this.props.address}
                    complete={complete}/>
            )
        })
    }

    render(){
        const { Header, Row, HeaderCell, Body } = Table;
        return(
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: '10px'}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Value (eth)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
        <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        )
    }
}

export default RequestIndex;