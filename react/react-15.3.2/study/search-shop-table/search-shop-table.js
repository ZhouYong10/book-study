/**
 * Created by ubuntu64 on 10/26/16.
 */
var ProductCategoryRow = React.createClass({
    render: function () {
        return (
            <tr>
                <th colSpan="2">
                    {this.props.category}
                </th>
            </tr>
        );
    }
});

var ProductRow = React.createClass({
    render: function () {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
    render: function () {
        var filterText = this.props.filterText;
        var isStockOnly = this.props.isStockOnly;
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function (product) {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            if(product.name.indexOf(filterText) !== -1 && (!isStockOnly || product.stocked)) {
                rows.push(<ProductRow product={product} key={product.name}/>);
            }

            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    //handleFilterText: function(e) {
    //    this.props.onSearchChange({filterText: e.target.value});  //子组件不应该知道父组件的信息
    //},
    //handleIsStock: function(e) {
    //    this.props.onSearchChange({isStockOnly: e.target.checked});
    //},
    onUserInput: function(e) {
        this.props.onSearchChange(
            this.refs.filterTextInput.value,
            this.refs.isStockOnlyInput.checked
        );
    },
    render: function () {
        return (
            <form>
                <input type="text" placeholder="Search..."
                       ref="filterTextInput"
                       value={this.props.filterText}
                       onChange={this.onUserInput}/>
                <p>
                    <input type="checkbox"
                           ref="isStockOnlyInput"
                           checked={this.props.isStockOnly}
                           onChange={this.onUserInput}/>
                    {' '} Only show products stock.
                </p>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    onSearchChange: function(filterText, isStockOnly) {
        this.setState({
            filterText: filterText,
            isStockOnly: isStockOnly
        });
    },
    getInitialState: function() {
        return {filterText: '', isStockOnly: false};
    },
    render: function () {
        return (
            <div>
                {/*
                 <SearchBar filterText={this.state.filterText} isStockOnly={this.state.isStockOnly} onSearchChange={this.onSearchChange}/>
                 <ProductTable products={this.props.products} filterText={this.state.filterText} isStockOnly={this.state.isStockOnly}/>
                 此处可以直接使用解析赋值，如下：
                */}
                <SearchBar {...this.state} onSearchChange={this.onSearchChange}/>
                <ProductTable products={this.props.products} {...this.state}/>
            </div>
        );
    }
});

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('content')
);





















