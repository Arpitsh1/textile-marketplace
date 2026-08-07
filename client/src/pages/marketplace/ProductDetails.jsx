import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      for (let i = 0; i < quantity; i++) {
        await API.post("/cart/add", {
          productId: product._id,
        });
      }

      alert("Product added to cart!");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add product");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Product...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <h3>Product not found.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/marketplace")}
      >
        ← Back to Marketplace
      </button>

      <div className="card shadow-lg">

        <div className="row g-0">

          <div className="col-md-5 text-center p-4">

            <img
              src={
                product.image
                  ? product.image
                  : "https://via.placeholder.com/500x400?text=No+Image"
              }
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxHeight: "400px",
                objectFit: "cover",
              }}
            />

          </div>

          <div className="col-md-7">

            <div className="card-body">

              <h2>{product.name}</h2>

              <span className="badge bg-primary mb-3">
                {product.category}
              </span>

              <p className="text-muted">
                {product.description}
              </p>

              <h3 className="text-success">
                ₹{product.price}
              </h3>

              <hr />

              <p>
                <strong>Available Stock:</strong>{" "}
                {product.stock}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {product.stock > 0 ? (
                  <span className="badge bg-success">
                    In Stock
                  </span>
                ) : (
                  <span className="badge bg-danger">
                    Out of Stock
                  </span>
                )}
              </p>

              <p>
                <strong>Colors:</strong>{" "}
                {product.colors?.length
                  ? product.colors.join(", ")
                  : "N/A"}
              </p>

              {product.stock > 0 && (
                <>
                  <div className="mb-3">

                    <label className="form-label">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Number(e.target.value))
                      }
                      className="form-control"
                      style={{ width: "120px" }}
                    />

                  </div>

                  <button
                    className="btn btn-success btn-lg"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      </div>

      <div className="card mt-4 shadow">

        <div className="card-body">

          <h4>Customer Reviews</h4>

          <hr />

          <p className="text-muted">
            Reviews feature coming soon...
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;