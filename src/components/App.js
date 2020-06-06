import React, { Component } from 'react';

import { connect } from "react-redux";

import { fetchProducts } from "../action/fetchData";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            count: 1,
            show: false
        };
    }

    handleChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ show: true });
        // console.log("You are submitting " + this.state.searchValue);
        this.props.dispatch(fetchProducts(this.state.searchValue, this.state.count));
    }

    handleShowMore = () => {
        this.setState({ count: this.state.count + 1 }, 
            () => { this.props.dispatch(fetchProducts(this.state.searchValue, this.state.count)) });
    }

    render() {
        return (
            <>
                <header>
                    <div className="divHeader">
                        <form onSubmit={this.handleSubmit}>
                            <input
                                className="inputText"
                                type="text"
                                placeholder="search for an anime, e.g Naruto"
                                onChange={this.handleChange}
                            />
                            <input
                                className="inputButton"
                                type='submit'
                                value="Go"
                                onClick={this.handleSubmit}
                            />
                        </form>
                        {this.state.show && <h1>Requesting:{`https://api.jikan.moe/v3/search/anime?page=${this.state.count}&q=${this.state.searchValue}"&limit=16`}</h1>}
                    </div>
                </header>
                {this.state.show &&
                    <section className="card-row">
                        {this.props.item.map((i, j) => (
                            <article className="card" key={j}>
                                <div
                                    className="card__img"
                                    aria-label="Preview of Whizzbang Widget"
                                    style={{
                                        backgroundImage: `url(${i.image_url})`
                                    }}></div>
                                <div className="card__content">
                                    <h3>{i.title}</h3>
                                    {/* <p>
                                        Liquorice candy macaroon soufflé jelly cake. Candy canes ice cream
                                        biscuit marzipan. Macaroon pie sesame snaps jelly-o.
                                    </p> */}
                                </div>
                            </article>

                        ))
                        }
                        <button onClick={this.handleShowMore}>Show more..</button>
                    </section>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    item: state.list.item,
    loading: state.list.loading,
    error: state.list.error
});

export default connect(mapStateToProps)(App);