import { faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { productApi } from '../../api/product/productApi';
import { sizeApi } from '../../api/size/sizeApi';
import { colorGoldApi } from '../../api/color/colorGoldApi';
import { colorStoneApi } from '../../api/color/colorStoneApi';
import { categoryApi } from '../../api/category/categoryApi';
import { subcategoryApi } from '../../api/subcategory/subcategoryApi';
import { tripletecategoryApi } from '../../api/tripletecategory/tripletecategoryApi';

const EditProduct = ({ product, setOpenEditProduct }) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [titlecategory, setTitlecategory] = useState('');
  const [titlesubcategory, setTitlesubcategory] = useState('');
  const [titletripletecategory, setTitletripletecategory] = useState('');
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [titlesize, setTitlesize] = useState('');
  const [titlecolorgold, setTitlecolorgold] = useState('');
  const [titlecolorstone, setTitlecolorstone] = useState('');
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [title, setTitle] = useState(product.title);
  const [categoryOptions, setCategoryOptions] = useState(product.categoryOptions);
  const [subcategoryOptions, setSubcategoryOptions] = useState(product.subcategoryOptions);
  const [tripletecategoryOptions, setTripletecategoryOptions] = useState(product.tripletecategoryOptions);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [sizesOptions, setSizesOptions] = useState(product.sizesOptions);
  const [colorsgoldsOptions, setColorsgoldsOptions] = useState(product.colorsgoldsOptions);
  const [colorsstonesOptions, setColorsstonesOptions] = useState(product.colorsstonesOptions);
  const [image, setImage] = useState(product.image);
  const [imagesOnes, setImagesOnes] = useState(product.imagesOnes);

  const editProductHandler = async (e) => {
    e.preventDefault();

    try {

      const { data } = await productApi.put("/update", {
        _id: product._id,
        title,
        categoryOptions,
        subcategoryOptions,
        tripletecategoryOptions,
        countInStock,
        description,
        price,
        sizesOptions,
        colorsgoldsOptions,
        colorsstonesOptions,
        image,
        imagesOnes
      });

      console.log(data);
      toast.success("¡.Has Actualizado Correctamente El Producto.!");
      setOpenEditProduct(false);

    } catch (err) {
      toast.error("¡.Actualización Fallida, Inténtalo De Nuevo.!")
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //for sizesOptions add fields
  const handleChangeSizeOption = (e, i) => {
    e.preventDefault();
    const clonedSizesOptions = [...sizesOptions];
    clonedSizesOptions[`${i}`] = { value: e.target.value, key: i };
    setSizesOptions(clonedSizesOptions);
  };

  const removeSizeOptionFields = (i) => {
    const newSizeOptionValues = [...sizesOptions];
    newSizeOptionValues.splice(i, 1);
    setSizesOptions(newSizeOptionValues);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //for colorsGoldsOptions add fields
  const handleChangeColorGoldOption = (e, i) => {
    e.preventDefault();
    const clonedColorsGoldsOptions = [...colorsgoldsOptions];
    clonedColorsGoldsOptions[`${i}`] = { value: e.target.value, key: i };
    setColorsgoldsOptions(clonedColorsGoldsOptions);
  };

  const removeColorGoldOptionFields = (i) => {
    const newColorGoldOptionValues = [...colorsgoldsOptions];
    newColorGoldOptionValues.splice(i, 1);
    setColorsgoldsOptions(newColorGoldOptionValues);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //for colorsStonesOptions add fields
  const handleChangeColorStoneOption = (e, i) => {
    e.preventDefault();
    const clonedColorsStonesOptions = [...colorsstonesOptions];
    clonedColorsStonesOptions[`${i}`] = { value: e.target.value, key: i };
    setColorsstonesOptions(clonedColorsStonesOptions);
  };

  const removeColorStoneOptionFields = (i) => {
    const newColorStoneOptionValues = [...colorsstonesOptions];
    newColorStoneOptionValues.splice(i, 1);
    setColorsstonesOptions(newColorStoneOptionValues);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //for imageOne add fields
  const handleChangeImageOne = (e, i) => {
    e.preventDefault();
    const clonedImagesOnes = [...imagesOnes];
    clonedImagesOnes[`${i}`] = { value: e.target.value, key: i };
    setImagesOnes(clonedImagesOnes);
  };

  const removeImageOneFields = (i) => {
    const newImageOneValues = [...imagesOnes];
    newImageOneValues.splice(i, 1);
    setImagesOnes(newImageOneValues);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {

    const fetchData = async () => {
      const resultCategory = await categoryApi.get('/all');
      console.log(resultCategory.data);
      setTitlecategory(resultCategory.data);

      const resultSubcategory = await subcategoryApi.get('/all');
      console.log(resultSubcategory.data);
      setTitlesubcategory(resultSubcategory.data);

      const resultTripletecategory = await tripletecategoryApi.get('/all');
      console.log(resultTripletecategory.data);
      setTitletripletecategory(resultTripletecategory.data);

      const resultSizes = await sizeApi.get('/all');
      console.log(resultSizes.data);
      setTitlesize(resultSizes.data);

      const resultColorsgolds = await colorGoldApi.get('/all');
      console.log(resultColorsgolds.data);
      setTitlecolorgold(resultColorsgolds.data);

      const resultColorsstones = await colorStoneApi.get('/all');
      console.log(resultColorsstones.data);
      setTitlecolorstone(resultColorsstones.data);
    }

    fetchData();

  }, []);

  return (
    <>
      <div className="card mb-3">
        <div className="bg-holder d-none d-lg-block bg-card" />
        <div className="card-body position-relative">
          <div className="row">
            <div className="col-lg-8" style={{ textAlign: "justify" }}>
              <div className="close-form" onClick={() => setOpenEditProduct(false)}>X</div>
              <h3>
                <FontAwesomeIcon icon={faRefresh} className="far fa-check-circle me-1" data-fa-transform="shrink-3" /> Editar Producto. - {product.title}
              </h3>
              <p className="mt-2">
                <form onSubmit={editProductHandler}>
                  <div>
                    <hr />
                    <label htmlFor="title">
                      CAMBIAR TITULO. :*
                    </label>
                    <div className="form-floating mb-3">
                      <input className="form-control" type="text" onChange={(e) => setTitle(e.target.value)} value={title} id='title' required />
                      <label htmlFor="title">
                        CAMBIAR TITULO. :*
                      </label>
                    </div>
                    <hr />
                    <fieldset>
                      <legend style={{ textAlign: "justify" }}>
                        <label htmlFor="categoryOptions">
                          <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                            <i className="fa-solid fa-filter"></i> AVISO IMPORTANTE. :*
                          </span>
                        </label> -
                        CAMBIAR MEN&#218; DE OPCIONES 1 CATEGORÍA.
                      </legend>
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <p>
                            <label htmlFor="categoryOptions">
                              CAMBIAR MEN&#218; DE OPCIONES 1 CATEGORÍA. :*
                            </label>
                            <div className="form-floating mb-3">
                              <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setCategoryOptions(e.target.value)}
                                value={categoryOptions}
                                name={categoryOptions}
                                id='categoryOptions'
                                required />
                              <div className="mb-3">
                                <label htmlFor="categoryOptions">
                                  Seleccione Uno ⬆️. :*
                                </label>
                                <select
                                  className="form-select js-choice"
                                  aria-label=".form-select-lg js-choice"
                                  data-placeholder="--- Seleccionar ---"
                                  data-control="select2"
                                  defaultValue={{ label: "--- Seleccionar ---", value: 0 }}
                                  onChange={(e) => setCategoryOptions(e.target.value)}
                                  value={categoryOptions}
                                  name={categoryOptions}
                                  id={categoryOptions}
                                  required="required"
                                  data-options='{"removeItemButton":true,"placeholder":true}'>
                                  <option value={'Seleccionar'} defaultValue hidden>
                                    {'--- Seleccionar ---'}
                                  </option>
                                  {titlecategory &&
                                    titlecategory.map((titlecategory) => (
                                      <option
                                        details={titlecategory}
                                        key={titlecategory._id}
                                        name={titlecategory.titlecategory}
                                        value={titlecategory.titlecategory}
                                        className="badge rounded-pill badge-soft-warning">
                                        <code>
                                          {titlecategory.titlecategory}
                                        </code>
                                      </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                  <span className="badge rounded-pill badge-soft-danger">
                                    <code>
                                      ¡.ALERTA POR FAVOR Seleccione Uno.!
                                    </code>
                                  </span>
                                </div>
                              </div>
                              <label htmlFor="categoryOptions">
                                CAMBIAR MEN&#218; DE OPCIONES 1 CATEGORÍA. :*
                              </label>
                            </div>
                          </p>
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                    <fieldset>
                      <legend style={{ textAlign: "justify" }}>
                        <label htmlFor="subcategoryOptions">
                          <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                            <i className="fa-solid fa-filter"></i> AVISO IMPORTANTE. :*
                          </span>
                        </label> -
                        CAMBIAR MEN&#218; DE OPCIONES 2 CATEGORÍA.
                      </legend>
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <p>
                            <label htmlFor="subcategoryOptions">
                              CAMBIAR MEN&#218; DE OPCIONES 2 CATEGORÍA. :*
                            </label>
                            <div className="form-floating mb-3">
                              <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setSubcategoryOptions(e.target.value)}
                                value={subcategoryOptions}
                                name={subcategoryOptions}
                                id='subcategoryOptions'
                                required />
                              <div className="mb-3">
                                <label htmlFor="subcategoryOptions">
                                  Seleccione Uno ⬆️. :*
                                </label>
                                <select
                                  className="form-select js-choice"
                                  aria-label=".form-select-lg js-choice"
                                  data-placeholder="--- Seleccionar ---"
                                  data-control="select2"
                                  defaultValue={{ label: "--- Seleccionar ---", value: 0 }}
                                  onChange={(e) => setSubcategoryOptions(e.target.value)}
                                  value={subcategoryOptions}
                                  name={subcategoryOptions}
                                  id={subcategoryOptions}
                                  required="required"
                                  data-options='{"removeItemButton":true,"placeholder":true}'>
                                  <option value={'Seleccionar'} defaultValue hidden>
                                    {'--- Seleccionar ---'}
                                  </option>
                                  {titlesubcategory &&
                                    titlesubcategory.map((titlesubcategory) => (
                                      <option
                                        details={titlesubcategory}
                                        key={titlesubcategory._id}
                                        name={titlesubcategory.titlesubcategory}
                                        value={titlesubcategory.titlesubcategory}
                                        className="badge rounded-pill badge-soft-warning">
                                        <code>
                                          {titlesubcategory.titlesubcategory}
                                        </code>
                                      </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                  <span className="badge rounded-pill badge-soft-danger">
                                    <code>
                                      ¡.ALERTA POR FAVOR Seleccione Uno.!
                                    </code>
                                  </span>
                                </div>
                              </div>
                              <label htmlFor="subcategoryOptions">
                                CAMBIAR MEN&#218; DE OPCIONES 2 CATEGORÍA. :*
                              </label>
                            </div>
                          </p>
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                    <fieldset>
                      <legend style={{ textAlign: "justify" }}>
                        <label htmlFor="tripletecategoryOptions">
                          <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                            <i className="fa-solid fa-filter"></i> AVISO IMPORTANTE. :*
                          </span>
                        </label> -
                        CAMBIAR MEN&#218; DE OPCIONES 3 CATEGORÍA.
                      </legend>
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <p>
                            <label htmlFor="tripletecategoryOptions">
                              CAMBIAR MEN&#218; DE OPCIONES 3 CATEGORÍA. :*
                            </label>
                            <div className="form-floating mb-3">
                              <input
                                className="form-control"
                                type="text"
                                onChange={(e) => setTripletecategoryOptions(e.target.value)}
                                value={tripletecategoryOptions}
                                name={tripletecategoryOptions}
                                id='tripletecategoryOptions'
                                required />
                              <div className="mb-3">
                                <label htmlFor="tripletecategoryOptions">
                                  Seleccione Uno ⬆️. :*
                                </label>
                                <select
                                  className="form-select js-choice"
                                  aria-label=".form-select-lg js-choice"
                                  data-placeholder="--- Seleccionar ---"
                                  data-control="select2"
                                  defaultValue={{ label: "--- Seleccionar ---", value: 0 }}
                                  onChange={(e) => setTripletecategoryOptions(e.target.value)}
                                  value={tripletecategoryOptions}
                                  name={tripletecategoryOptions}
                                  id={tripletecategoryOptions}
                                  required="required"
                                  data-options='{"removeItemButton":true,"placeholder":true}'>
                                  <option value={'Seleccionar'} defaultValue hidden>
                                    {'--- Seleccionar ---'}
                                  </option>
                                  {titletripletecategory &&
                                    titletripletecategory.map((titletripletecategory) => (
                                      <option
                                        details={titletripletecategory}
                                        key={titletripletecategory._id}
                                        name={titletripletecategory.titletripletecategory}
                                        value={titletripletecategory.titletripletecategory}
                                        className="badge rounded-pill badge-soft-warning">
                                        <code>
                                          {titletripletecategory.titletripletecategory}
                                        </code>
                                      </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                  <span className="badge rounded-pill badge-soft-danger">
                                    <code>
                                      ¡.ALERTA POR FAVOR Seleccione Uno.!
                                    </code>
                                  </span>
                                </div>
                              </div>
                              <label htmlFor="tripletecategoryOptions">
                                CAMBIAR MEN&#218; DE OPCIONES 3 CATEGORÍA. :*
                              </label>
                            </div>
                          </p>
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                    <label htmlFor="countInStock">
                      CANTIDAD 🛍️. :*
                    </label>
                    <div className="form-floating mb-3">
                      <input className="form-control" type="number" min={0} max={9000} onChange={(e) => setCountInStock(e.target.value)} value={countInStock} id='countInStock' required />
                      <label htmlFor="countInStock">
                        CANTIDAD 🛍️. :*
                      </label>
                    </div>
                    <hr />
                    <fieldset>
                      <legend style={{ textAlign: "justify" }}>
                        <label htmlFor="price">
                          <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                            <FontAwesomeIcon icon="fa-solid fa-dollar-sign" /> AVISO IMPORTANTE. :*
                          </span>
                        </label> -
                        POR FAVOR TIENES QUE ESCRIBIR ASI <span><b><code className='badge rounded-pill badge-soft-danger' style={{ fontSize: "15px" }}>"SIN PUNTO SEQUIDO (.)"</code></b></span>.
                      </legend>
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <p>
                            <label htmlFor="price">
                              CAMBIAR PRECIO. :*
                            </label>
                            <div className="form-floating mb-3">
                              <input className="form-control" type="text" onChange={(e) => setPrice(e.target.value)} value={price} id='price' required />
                              <label htmlFor="price">
                                CAMBIAR PRECIO. :*
                              </label>
                            </div>
                          </p>
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                    <label htmlFor="desc">
                      CAMBIAR DESCRIPCIÓN. :*
                    </label>
                    <div className="form-floating mb-3">
                      <textarea className="form-control" id="desc" cols="100" rows="100" required onChange={(e) => setDescription(e.target.value)} value={description} spellCheck={false} style={{ height: 150, textAlign: "justify" }} />
                      <label htmlFor="desc">
                        CAMBIAR DESCRIPCIÓN. :*
                      </label>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-heading">CAMBIAR MEN&#218; DE OPCIONES LA TALLA 📏. :*</div>
                        <div className="panel-body">
                          <fieldset className="col-md-12">
                            <legend style={{ textAlign: "justify" }}>
                              <label htmlFor="sizesOptions">
                                <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                                  <FontAwesomeIcon icon="fa-solid fa-gear" /> AVISO IMPORTANTE. :*
                                </span>
                              </label> -
                              CAMBIAR MEN&#218; DE OPCIONES LA TALLA 📏.
                            </legend>
                            <div className="panel panel-default">
                              <div className="panel-body">
                                <p>
                                  <div className="form-group">
                                    <div className="form-groupValues">
                                      <label htmlFor="sizesOptions">
                                        CAMBIAR MEN&#218; DE OPCIONES LA TALLA 📏. :*
                                      </label>
                                      <div className="form-floating mb-3">
                                        {
                                          product.sizesOptions?.map((item, i) => (
                                            <>
                                              <div className='d-flexAdd form-floating mb-3' key={i}>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  key={item.i}
                                                  onChange={(e) => handleChangeSizeOption(e, i, item.i)}
                                                  value={sizesOptions[`${i}`]?.value || ''}
                                                  name={sizesOptions[`${i}`]?.value || ''}
                                                  id={sizesOptions[`${i}`]?.value || ''} required />
                                                <label htmlFor="sizesOptions">
                                                  CAMBIAR MEN&#218; DE OPCIONES LA TALLA 📏. :*
                                                </label>
                                                {
                                                  i ? <button type='button' className='btn-remove btn btn-outline-danger me-1 mb-1' onClick={() => removeSizeOptionFields(i)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                  </button> : null
                                                }
                                              </div>
                                              <div className="mb-3">
                                                <label htmlFor="sizesOptions">
                                                  Seleccione Uno ⬆️. :*
                                                </label>
                                                <select
                                                  className="form-select js-choice"
                                                  aria-label=".form-select-lg js-choice"
                                                  data-placeholder="--- Seleccionar ---"
                                                  data-control="select2"
                                                  defaultValue={{ label: "--- Seleccionar ---", value: 0 }}
                                                  onChange={(e) => handleChangeSizeOption(e, i, item.i)}
                                                  value={sizesOptions[`${i}`]?.value || ''}
                                                  name={sizesOptions[`${i}`]?.value || ''}
                                                  id={sizesOptions[`${i}`]?.value || ''}
                                                  required="required"
                                                  data-options='{"removeItemButton":true,"placeholder":true}'>
                                                  <option value={'Seleccionar'} defaultValue hidden>
                                                    {'--- Seleccionar ---'}
                                                  </option>
                                                  {titlesize &&
                                                    titlesize.map((titlesize) => (
                                                      <option
                                                        details={titlesize}
                                                        key={titlesize._id}
                                                        name={titlesize.titlesize}
                                                        value={titlesize.titlesize}
                                                        className="badge rounded-pill badge-soft-warning">
                                                        <code>
                                                          {titlesize.titlesize}
                                                        </code>
                                                      </option>
                                                    ))}
                                                </select>
                                                <div className="invalid-feedback">
                                                  <span className="badge rounded-pill badge-soft-danger">
                                                    <code>
                                                      ¡.ALERTA POR FAVOR Seleccione Uno.!
                                                    </code>
                                                  </span>
                                                </div>
                                              </div>
                                            </>
                                          ))}
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                </p>
                              </div>
                            </div>
                          </fieldset>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-heading">CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE ORO 🖌️. :*</div>
                        <div className="panel-body">
                          <fieldset className="col-md-12">
                            <legend style={{ textAlign: "justify" }}>
                              <label htmlFor="colorsgoldsOptions">
                                <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                                  <FontAwesomeIcon icon="fa-solid fa-gear" /> AVISO IMPORTANTE. :*
                                </span>
                              </label> -
                              CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE ORO 🖌️.
                            </legend>
                            <div className="panel panel-default">
                              <div className="panel-body">
                                <p>
                                  <div className="form-group">
                                    <div className="form-groupValues">
                                      <label htmlFor="colorsgoldsOptions">
                                        CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE ORO 🖌️. :*
                                      </label>
                                      <div className="form-floating mb-3">
                                        {
                                          product.colorsgoldsOptions?.map((item, i) => (
                                            <>
                                              <div className='d-flexAdd form-floating mb-3' key={i}>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  key={item.i}
                                                  onChange={(e) => handleChangeColorGoldOption(e, i, item.i)}
                                                  value={colorsgoldsOptions[`${i}`]?.value || ''}
                                                  name={colorsgoldsOptions[`${i}`]?.value || ''}
                                                  id={colorsgoldsOptions[`${i}`]?.value || ''} required />
                                                <label htmlFor="colorsgoldsOptions">
                                                  CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE ORO 🖌️. :*
                                                </label>
                                                {
                                                  i ? <button type='button' className='btn-remove btn btn-outline-danger me-1 mb-1' onClick={() => removeColorGoldOptionFields(i)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                  </button> : null
                                                }
                                              </div>
                                              <div className="mb-3">
                                                <label htmlFor="colorsgoldsOptions">
                                                  Seleccione Uno ⬆️. :*
                                                </label>
                                                <select
                                                  className="form-select js-choice"
                                                  aria-label=".form-select-lg js-choice"
                                                  data-placeholder="--- Seleccionar ---"
                                                  data-control="select2"
                                                  defaultValue={{ label: "--- Seleccionar ---", value: 0 }}
                                                  onChange={(e) => handleChangeColorGoldOption(e, i, item.i)}
                                                  value={colorsgoldsOptions[`${i}`]?.value || ''}
                                                  name={colorsgoldsOptions[`${i}`]?.value || ''}
                                                  id={colorsgoldsOptions[`${i}`]?.value || ''}
                                                  required="required"
                                                  data-options='{"removeItemButton":true,"placeholder":true}'>
                                                  <option value={'Seleccionar'} defaultValue hidden>
                                                    {'--- Seleccionar ---'}
                                                  </option>
                                                  {titlecolorgold &&
                                                    titlecolorgold.map((titlecolorgold) => (
                                                      <option
                                                        details={titlecolorgold}
                                                        key={titlecolorgold._id}
                                                        name={titlecolorgold.titlecolorgold}
                                                        value={titlecolorgold.titlecolorgold}
                                                        className="badge rounded-pill badge-soft-warning">
                                                        <code>
                                                          {titlecolorgold.titlecolorgold}
                                                        </code>
                                                      </option>
                                                    ))}
                                                </select>
                                                <div className="invalid-feedback">
                                                  <span className="badge rounded-pill badge-soft-danger">
                                                    <code>
                                                      ¡.ALERTA POR FAVOR Seleccione Uno.!
                                                    </code>
                                                  </span>
                                                </div>
                                              </div>
                                            </>
                                          ))}
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                </p>
                              </div>
                            </div>
                          </fieldset>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-heading">CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE PIEDRAS 🖌️. :*</div>
                        <div className="panel-body">
                          <fieldset className="col-md-12">
                            <legend style={{ textAlign: "justify" }}>
                              <label htmlFor="colorsstonesOptions">
                                <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                                  <FontAwesomeIcon icon="fa-solid fa-gear" /> AVISO IMPORTANTE. :*
                                </span>
                              </label> -
                              CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE PIEDRAS 🖌️.
                            </legend>
                            <div className="panel panel-default">
                              <div className="panel-body">
                                <p>
                                  <div className="form-group">
                                    <div className="form-groupValues">
                                      <label htmlFor="colorsstonesOptions">
                                        CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE PIEDRAS 🖌️. :*
                                      </label>
                                      <div className="form-floating mb-3">
                                        {
                                          product.colorsstonesOptions?.map((item, i) => (
                                            <>
                                              <div className='d-flexAdd form-floating mb-3' key={i}>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  key={item.i}
                                                  onChange={(e) => handleChangeColorStoneOption(e, i, item.i)}
                                                  value={colorsstonesOptions[`${i}`]?.value || ''}
                                                  name={colorsstonesOptions[`${i}`]?.value || ''}
                                                  id={colorsstonesOptions[`${i}`]?.value || ''} required />
                                                <label htmlFor="colorsstonesOptions">
                                                  CAMBIAR MEN&#218; DE OPCIONES EL COLOR DE PIEDRAS 🖌️. :*
                                                </label>
                                                {
                                                  i ? <button type='button' className='btn-remove btn btn-outline-danger me-1 mb-1' onClick={() => removeColorStoneOptionFields(i)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                  </button> : null
                                                }
                                              </div>
                                              <div className="mb-3">
                                                <label htmlFor="colorsstonesOptions">
                                                  Seleccione Uno ⬆️. :*
                                                </label>
                                                <select
                                                  className="form-select js-choice"
                                                  aria-label=".form-select-lg js-choice"
                                                  data-placeholder="--- Seleccionar ---"
                                                  data-control="select2"
                                                  defaultValue={{ label: "--- Seleccionar ---", value: 0 }}
                                                  onChange={(e) => handleChangeColorStoneOption(e, i, item.i)}
                                                  value={colorsstonesOptions[`${i}`]?.value || ''}
                                                  name={colorsstonesOptions[`${i}`]?.value || ''}
                                                  id={colorsstonesOptions[`${i}`]?.value || ''}
                                                  required="required"
                                                  data-options='{"removeItemButton":true,"placeholder":true}'>
                                                  <option value={'Seleccionar'} defaultValue hidden>
                                                    {'--- Seleccionar ---'}
                                                  </option>
                                                  {titlecolorstone &&
                                                    titlecolorstone.map((titlecolorstone) => (
                                                      <option
                                                        details={titlecolorstone}
                                                        key={titlecolorstone._id}
                                                        name={titlecolorstone.titlecolorstone}
                                                        value={titlecolorstone.titlecolorstone}
                                                        className="badge rounded-pill badge-soft-warning">
                                                        <code>
                                                          {titlecolorstone.titlecolorstone}
                                                        </code>
                                                      </option>
                                                    ))}
                                                </select>
                                                <div className="invalid-feedback">
                                                  <span className="badge rounded-pill badge-soft-danger">
                                                    <code>
                                                      ¡.ALERTA POR FAVOR Seleccione Uno.!
                                                    </code>
                                                  </span>
                                                </div>
                                              </div>
                                            </>
                                          ))}
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                </p>
                              </div>
                            </div>
                          </fieldset>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-heading">IMAGEN PRINCIPAL 📸. :*</div>
                        <div className="panel-body">
                          <fieldset className="col-md-12">
                            <legend style={{ textAlign: "justify" }}>
                              <label htmlFor="image">
                                <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                                  <i className='fas fa-camera-retro'></i> AVISO IMPORTANTE. :*
                                </span>
                              </label> -
                              POR FAVOR TIENES QUE ESCRIBIR ASI <span><b><code className='badge rounded-pill badge-soft-danger' style={{ fontSize: "15px" }}>"(.png) y (.jpg)"</code></b></span> Sin Mayuscula con Solo El Link De Enlace Con URL <FontAwesomeIcon icon="fa-solid fa-arrow-right" style={{ fontSize: "15px" }} /> <a className='badge rounded-pill badge-soft-secondary' style={{ fontSize: "15px" }} href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" role="button" data-mdb-ripple-color="dark">
                                <FontAwesomeIcon icon="fa-solid fa-globe" style={{ fontSize: "15px", color: "blue" }} /> Haz Clic Aquí.
                              </a>.
                            </legend>
                            <div className="panel panel-default">
                              <div className="panel-body">
                                <p>
                                  <label htmlFor="image">
                                    CAMBIAR IMAGEN PRINCIPAL 📸. :*
                                  </label>
                                  <div className="form-floating mb-3">
                                    <input className="form-control" type="text" onChange={(e) => setImage(e.target.value)} value={image} id='image' required />
                                    <label htmlFor="image">
                                      CAMBIAR IMAGEN PRINCIPAL 📸. :*
                                    </label>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </fieldset>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="panel panel-default">
                        <div className="panel-heading">CAMBIAR IMAGENES MULTIPLES 📸. :*</div>
                        <div className="panel-body">
                          <fieldset className="col-md-12">
                            <legend style={{ textAlign: "justify" }}>
                              <label htmlFor="imagesOnes">
                                <span className="badge rounded-pill badge-soft-warning" style={{ fontSize: "15px" }}>
                                  <i className='fas fa-camera-retro'></i> AVISO IMPORTANTE. :*
                                </span>
                              </label> -
                              POR FAVOR TIENES QUE ESCRIBIR ASI <span><b><code className='badge rounded-pill badge-soft-danger' style={{ fontSize: "15px" }}>"(.png) y (.jpg)"</code></b></span> Sin Mayuscula con Solo El Link De Enlace Con URL <FontAwesomeIcon icon="fa-solid fa-arrow-right" style={{ fontSize: "15px" }} /> <a className='badge rounded-pill badge-soft-secondary' style={{ fontSize: "15px" }} href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" role="button" data-mdb-ripple-color="dark">
                                <FontAwesomeIcon icon="fa-solid fa-globe" style={{ fontSize: "15px", color: "blue" }} /> Haz Clic Aquí.
                              </a>.
                            </legend>
                            <div className="panel panel-default">
                              <div className="panel-body">
                                <p>
                                  <div className="form-group">
                                    <div className="form-groupValues">
                                      <label htmlFor="imagesOnes">
                                        CAMBIAR IMAGENES MULTIPLES 📸. :*
                                      </label>
                                      <div className="form-floating mb-3">
                                        {
                                          product.imagesOnes?.map((item, i) => (
                                            <div className='d-flexAdd form-floating mb-3' key={i}>
                                              <input className="form-control" key={item.i} type="text" name='imagesOnes' onChange={(e) => handleChangeImageOne(e, i, item.i)} value={imagesOnes[`${i}`]?.value || ''} id='imagesOnes' required />
                                              <label htmlFor="imagesOnes">
                                                CAMBIAR IMAGENES MULTIPLES 📸. :*
                                              </label>
                                              {
                                                i ? <button type='button' className='btn-remove btn btn-outline-danger me-1 mb-1' onClick={() => removeImageOneFields(i)}>
                                                  <FontAwesomeIcon icon={faTrash} />
                                                </button> : null
                                              }
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </fieldset>
                          <div className="clearfix" />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                  <button className="btn btn-outline-primary me-1 mb-1" type='submit'>
                    <FontAwesomeIcon icon={faRefresh} className="far fa-check-circle me-1" data-fa-transform="shrink-3" /> Actualizar Cambios.
                  </button>
                </form>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
