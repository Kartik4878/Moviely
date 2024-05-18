import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import _ from "lodash";
import configs from "./configs.json"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Navigation from './Common/Navigation';
import MyProfile from './Components/MyProfile';
import HomePage from './Components/HomePage';
import AddToBasket from './Components/AddToBasket';
import MovieDetails from './Components/MovieDetails';
import Cart from './Components/Cart';
import RemoveButton from './Common/RemoveButton';
import OrderDetails from './Components/OrderDetails';
import Login from './Components/Login';
import Register from './Components/Register';
import Logout from './Components/Logout';
import APIHandler from './ApiConnections/APIHandler';
import AuthenticationServices from './ApiConnections/AuthenticationServices';
import MyOrders from './Components/MyOrders';
import Assignment from './Components/Assignment';
import DeliveryDetails from './Components/DeliveryDetails';
import Test from './Components/Test';




class App extends Component {
  state = {
    tableData: [],
    Columns: [
      { id: "Img_link", label: "", type: "image" },
      { id: "Name", label: "Movie Name", type: "text" },
      { id: "Rank", label: "Rank", type: "text" },
      { id: "Year", label: "Release Year", type: "text" },
      { id: "Imdb_rating", label: "Ratings", type: "text" },
      { id: "addToCart", label: "", type: "component", component: (item) => <AddToBasket item={item} onCartAdd={() => this.handleCartAdd(item)} cartItems={this.state.cart} /> }
    ],
    CartColumns: [
      { id: "Img_link", label: "", type: "image" },
      { id: "Name", label: "Movie Name", type: "text" },
      { id: "Rank", label: "Rank", type: "text" },
      { id: "Year", label: "Release Year", type: "text" },
      { id: "Imdb_rating", label: "Ratings", type: "text" },
      { id: "remove", label: "", type: "component", component: (item) => <RemoveButton item={item} onRemove={() => this.handleRemove(item)} /> }
    ],
    navItems: [
      { id: "cart", to: "/Cart", label: "Cart", showIcon: "true", isVisible: AuthenticationServices.getLoginStatus() },
      { id: "myOrders", to: "/MyOrders", label: "My Orders", isVisible: AuthenticationServices.getLoginStatus() },
      { id: "login", to: "/login", label: "Sign in", isVisible: !AuthenticationServices.getLoginStatus() },
      { id: "myprofile", to: "/myprofile", label: "My Profile", isVisible: AuthenticationServices.getLoginStatus() },
      { id: "signup", to: "/signup", label: "Sign up", isVisible: !AuthenticationServices.getLoginStatus() },
      { id: "logout", to: "/logout", label: "Log out", isVisible: AuthenticationServices.getLoginStatus() }
    ],
    cart: [],
    currentOpenOrder: {},
    myOrders: [],
    genres: [],
    itemsPerPage: 5,
    currentPage: 1,
    activeCategory: "All Genres",
    searchQuery: "",
    sortedColumn: "",
    sortOrder: "asc",
    currentNavPage: "home"
  }

  async componentDidMount() {


    APIHandler.setKey(AuthenticationServices.getUserKey());
    const { data } = await APIHandler.get(configs.CartDetails + AuthenticationServices.getUserID());
    const { data: MovieList } = await APIHandler.get(configs.MovieListURL);
    const { data: genres } = await APIHandler.get(configs.GenreListURL);
    this.setState({ genres: genres.pxResults });
    this.setState({ tableData: MovieList.pxResults });
    const cart = data.pxResults.map((item) => JSON.parse(item.ItemDetails));
    this.setState({ cart });
    const { data: myOrders } = await APIHandler.get(configs.GetOrderList + AuthenticationServices.getUserID());
    this.setState({ myOrders: myOrders.pxResults });
  }
  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category, currentPage: 1, searchQuery: "" })
  }
  handlePageChange = (PageNo) => {
    this.setState({ currentPage: PageNo, searchQuery: "" })
  }
  handleSearch = (searchQuery) => {
    this.setState({ searchQuery: searchQuery, activeCategory: "All Genres", currentPage: 1 })
  }
  handleSort = (column) => {
    let newSortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
    this.setState({ sortedColumn: column, sortOrder: newSortOrder });
  }
  handleCartAdd = async (item) => {
    const cartCopy = [...this.state.cart];
    const CartItemData = {
      MovieID: item.pyGUID,
      UserID: AuthenticationServices.getUserID(),
      ItemDetails: JSON.stringify(item)
    }
    try {
      const cart = [...this.state.cart, item];
      this.setState({ cart });
      await APIHandler.post(configs.ManageCart, CartItemData);
    } catch (error) {
      toast.error("An error occured while adding item to cart");
      this.setState({ cart: cartCopy });
    }
  }
  handleNavChange = (currentNavPage) => {
    this.setState({ currentNavPage })
  }
  handleOrderPlaced = async () => {
    await this.handleOrderReload();
    this.setState({ cart: [] });
  }
  handleOrderReload = async () => {
    const { data: myOrders } = await APIHandler.get(configs.GetOrderList + AuthenticationServices.getUserID());
    this.setState({ myOrders: myOrders.pxResults });
  }
  handleOrderOpen = (OrderDetails) => {
    this.setState({ currentOpenOrder: OrderDetails });
  }
  handleRemove = async (item) => {
    const cartCopy = [...this.state.cart];
    try {
      const cart = [...this.state.cart].filter((cartItem) => (cartItem.pyGUID !== item.pyGUID));
      this.setState({ cart });
      await APIHandler.delete(configs.ManageCart + "?MovieID=" + item.pyGUID + "&UserID=" + AuthenticationServices.getUserID());
    } catch (error) {
      toast.error("An error occured removing item from cart");
      this.setState({ cart: cartCopy });
    }
  }

  render() {
    const { tableData, Columns, genres, CartColumns, currentOpenOrder, currentNavPage, myOrders, itemsPerPage, cart, navItems, currentPage, activeCategory, searchQuery, sortedColumn, sortOrder } = this.state;
    let modifiedList = [...tableData]
    if (searchQuery !== "") {
      modifiedList = modifiedList.filter((item) => item.Name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }
    if (activeCategory !== "All Genres") {
      modifiedList = [...modifiedList.filter((item) => (item.Genre.includes(activeCategory)))];
    }
    if (sortedColumn !== "") {
      modifiedList = _.orderBy([...modifiedList], [sortedColumn], sortOrder);
    }
    const totalItems = modifiedList.length;
    modifiedList = [...modifiedList].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
      <div>
        <ToastContainer />
        <Navigation navItems={navItems} currentNavPage={currentNavPage} onNavChange={this.handleNavChange} cartItemCount={cart.length} />
        <Routes>
          <Route path='/Movie/:id' element={<MovieDetails cartItems={cart} onCartAdd={this.handleCartAdd} />} />
          <Route path='/Cart' element={<Cart CartItems={cart} Columns={CartColumns} onOrderPlaced={this.handleOrderPlaced} />} />
          <Route path='/Assignment/:assignID' element={<Assignment onOrderReload={this.handleOrderReload} CaseID={currentOpenOrder?.content?.pyID} />} />
          <Route path='/OrderDetails/:orderID' element={<OrderDetails onOrderOpen={this.handleOrderOpen} />} />
          <Route path='/Delivery/:deliveryID' element={<DeliveryDetails onOrderOpen={this.handleOrderOpen} orderID={currentOpenOrder?.content?.pzInsKey} />} />
          <Route path='/MyOrders' element={<MyOrders myOrders={myOrders} />} />
          <Route path='/Test' element={<Test />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/signup' element={<Register />} />
          <Route path="/" exact element={<HomePage
            MovieList={modifiedList}
            Columns={Columns}
            Genre={genres}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            sortedColumn={sortedColumn}
            sortOrder={sortOrder}
            onSearch={this.handleSearch}
            onCategoryChange={this.handleCategoryChange}
            onPageChange={this.handlePageChange}
            onSort={this.handleSort}
          />} />
        </Routes>
      </div>

    );
  }
}
export default App;
