import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SLink = ({ queryString, name, children }) => {
  return (
    <Link to={{ pathname: '/search', search: queryString }}>
      {name}
      {children}
    </Link>
  )
}

SLink.propTypes = {
  queryString: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.object
}

class CategoryDropDown extends Component {
  constructor() {
    super()
    this.state = {
      showDropDown: false
    }
    this.toggleCategoryDropDown = this.showCategoryDropDown.bind(this)
    this.closeCategoryDropDown = this.closeCategoryDropDown.bind(this)
  }

  showCategoryDropDown(e) {
    e.preventDefault();
    this.setState({ showDropDown: !this.state.showDropDown }, () => {
      document.addEventListener('click', this.closeCategoryDropDown);
    })
  }

  closeCategoryDropDown() {
    this.setState({ showDropDown: !this.state.showDropDown }, () => {
      document.removeEventListener('click', this.closeCategoryDropDown);
    })
  }

  render() {
    const { showDropDown } = this.state
    return (
      <div>
        <span id="main-category-drop-down" onClick={e => this.showCategoryDropDown(e)}>
          <i className="fas fa-bars"></i>
          Categories
        </span>

        <nav className={`wd-dropdown ${showDropDown ? 'show' : ''}`}>
          <ul className="vertical-menu-list">
            <li>
              <SLink queryString="?category=fashion" name="Fashion">
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu first-megamenu">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=womens_clothing"
                        name="Women&apos;s Clothing"
                        customNameClass="menu-tile" />
                    </li>
                    <li>
                      <SLink queryString="?category=womens_dresses" name="Dresses" />
                    </li>
                    <li><SLink name="Tops" queryString="?category=womens_tops" /></li>
                    <li><SLink name="Sweaters" queryString="?category=womens_sweaters" /></li>
                    <li><SLink name="Outerwear, Coats, Jacket" queryString="?category=womens_outerwear_coats_jacket" /></li>
                    <li><SLink name="Swimwear" queryString="?category=womens_swimwear" /></li>
                  </ul>
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=womens_shoes"
                        name="Women&apos;s Shoes"
                        customNameClass="menu-tile" />
                    </li>
                    <li>
                      <SLink queryString="?category=womens_shoes" name="Shoes" />
                    </li>
                    <li><SLink name="Sneakers" queryString="?category=womens_sneakers" /></li>
                    <li><SLink name="Sandals" queryString="?category=womens_sandals" /></li>
                    <li><SLink name="Flats" queryString="?category=womens_flats" /></li>
                    <li><SLink name="Heels" queryString="?category=womens_heels" /></li>
                    <li><SLink name="Boots &amp; Booties" queryString="?category=womens_boots_booties" /></li>
                    <li><SLink name="Clogs &amp; Mules" queryString="?category=womens_clogs_mules" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=mens_clothing"
                        name="Men&apos;s Clothing"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Dress Shirts" queryString="?category=mens_dress_shirts" /></li>
                    <li><SLink name="Jeans" queryString="?category=mens_jeans" /></li>
                    <li><SLink name="Outwear, Coats, Jacket" queryString="?category=mens_outer_wear_coats_jacket" /></li>
                    <li><SLink name="Graphic Tees" queryString="?category=mens_graphic_tees" /></li>
                    <li><SLink name="Shorts" queryString="?category=mens_shorts" /></li>
                    <li><SLink name="Active Wear" queryString="?category=mens_active_wear" /></li>
                  </ul>
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=mens_shoes"
                        name="Men&apos;s Shoes"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Sneakers" queryString="?category=mens_sneakers" /></li>
                    <li><SLink name="Oxfords" queryString="?category=mens_oxfords" /></li>
                    <li><SLink name="Boots" queryString="?category=mens_boots" /></li>
                    <li><SLink name="Sandals" queryString="?category=mens_sandals" /></li>
                    <li><SLink name="Boat Shoes" queryString="?category=mens_boat_shoes" /></li>
                    <li><SLink name="Loafers" queryString="?category=mens_loafers" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=accessories"
                        name="Accessories"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Women&apos; Handbags " queryString="?category=womens_handbags" /></li>
                    <li><SLink name="Men&apos; Bags" queryString="?category=men_bags" /></li>
                    <li><SLink name="Women&apos; Jewlery" queryString="?category=womens_jewlery" /></li>
                    <li><SLink name="Men&apos; Watches" queryString="?category=mens_watches" /></li>
                    <li><SLink name="Womens&apos; Eyewear" queryString="?category=womens_eyewear" /></li>
                    <li><SLink name="Men&apos; Eyewear" queryString="?category=mens_eyewear" /></li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Health & Beauty Section*/}
            <li>
              <SLink queryString="?category=health_beauty" name="Health &amp; Beauty ">
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu first-megamenu">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=health_care"
                        name="Health Care"
                        customNameClass="menu-tile" />
                    </li>
                    <li>
                      <SLink queryString="?category=health_monitors" name="Health Monitors" />
                    </li>
                    <li><SLink name="Relaxation" queryString="?category=relaxation" /></li>
                    <li><SLink name="Women&apos; Enhancements" queryString="?category=womens_enhancements" /></li>
                  </ul>
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=skin_care"
                        name="Skin Care"
                        customNameClass="menu-tile" />
                    </li>
                    <li>
                      <SLink queryString="?category=skin_care_face" name="Face" />
                    </li>
                    <li><SLink name="Eye &amp; Lips" queryString="?category=skin_care_eye_lips" /></li>
                    <li><SLink name="Sun Care" queryString="?category=sun_care" /></li>
                    <li><SLink name="Face Masks" queryString="?category=face_masks" /></li>
                    <li><SLink name="Skin Care Sets" queryString="?category=skin_care_sets" /></li>
                    <li><SLink name="Skin Care Tools" queryString="?category=skin_caretools" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=make_up"
                        name="Makeup"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Foundations &amp; Tinted Moisturizers" queryString="?category=foundations_tinted_moisturizers" /></li>
                    <li><SLink name="Concealers" queryString="?category=concealers" /></li>
                    <li><SLink name="Eyes" queryString="?category=eyes" /></li>
                    <li><SLink name="Lips" queryString="?category=lips" /></li>
                    <li><SLink name="Makeup Sets" queryString="?category=makeup_sets" /></li>
                    <li><SLink name="Makeup Tools &amp; Accessories" queryString="?category=makeup_tools_accessories" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=nail_care"
                        name="Nail Care"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Nail Gromming" queryString="?category=mens_sneakers" /></li>
                    <li><SLink name="Nail Art, Jewlery &amp; Tools" queryString="?category=nail_art_jewlery_tools" /></li>
                    <li><SLink name="Nail Treatments" queryString="?category=nail_treatments" /></li>
                    <li><SLink name="Nail Polish" queryString="?category=nail_polish" /></li>
                    <li><SLink name="Nail Dryers" queryString="?category=nail_dryers" /></li>
                    <li><SLink name="Nail Organizers" queryString="?category=nail_organizers" /></li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Baby Clothing & Shoes" */}
            <li>
              <SLink queryString="?category=baby" name="Baby" >
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu first-megamenu">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=baby_clothing_shoes"
                        name="Baby Clothing &amp; Shoes"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Baby Girl Clothing" queryString="?category=baby_girl_clothing" /></li>
                    <li><SLink name="Baby Boy Clothing" queryString="?category=baby_boy_clothing" /></li>
                    <li><SLink name="Unisex Baby Clothing" queryString="?category=unisex_baby_clothing" /></li>
                    <li><SLink name="Baby Clothing Gifts" queryString="?category=baby_clothing_gifts" /></li>
                    <li><SLink name="Kids Clothing" queryString="?category=kids_clothing" /></li>
                    <li><SLink name="Baby Shoes" queryString="?category=baby_shoes" /></li>
                  </ul>
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=baby_clothing_shoes"
                        name="Baby Activity &amp; Gear"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Strollers" queryString="?category=strollers" /></li>
                    <li><SLink name="Car Seats" queryString="?category=car_seats" /></li>
                    <li><SLink name="Carriers" queryString="?category=carriers" /></li>
                    <li><SLink name="Travel beds" queryString="?category=travel_beds" /></li>
                    <li><SLink name="Baby Play" queryString="?category=baby_play" /></li>
                    <li><SLink name="Baby Toys" queryString="?category=baby_toys" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=baby_nursery_feeding"
                        name="Baby Nursery &amp; Feeding"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Baby Bedding" queryString="?category=baby_bedding" /></li>
                    <li><SLink name="Baby Cribs" queryString="?category=baby_cribs" /></li>
                    <li><SLink name="Baby Furniture" queryString="?category=baby_furniture" /></li>
                    <li><SLink name="Baby Décor" queryString="?category=baby_decor" /></li>
                    <li><SLink name="Crib Toys &amp; Attachments" queryString="?category=crib_toys_attachments" /></li>
                    <li><SLink name="Baby Feeding" queryString="?category=baby_feeding" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=baby_health_safety"
                        name="Baby Health &amp; Safety"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Baby Monitors" queryString="?category=baby_monitors" /></li>
                    <li><SLink name="Baby Bath" queryString="?category=baby_bath" /></li>
                    <li><SLink name="Baby Proofing" queryString="?category=baby_proofing" /></li>
                    <li><SLink name="Baby Health Care" queryString="?category=baby_health_care" /></li>
                    <li><SLink name="Baby Safety" queryString="?category=baby_safety" /></li>
                    <li><SLink name="Baby Grooming" queryString="?category=baby_grooming" /></li>
                  </ul>
                </li>
              </ul>
            </li>
            
            {/* Furniture & Home Decor */}
            <li>
              <SLink queryString="?category=furniture_home_decor" name="Furniture &amp; Home Decor" >
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu first-megamenu">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=funiture"
                        name="Furniture"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Living Room Furniture" queryString="?category=living_room_furniture" /></li>
                    <li><SLink name="Bedroom Furniture" queryString="?category=bedroom_furniture" /></li>
                    <li><SLink name="Kitchen &amp; Dining Furniture" queryString="?category=kitchen_furniture" /></li>
                    <li><SLink name="Home Office Furniture" queryString="?category=home_office_furniture" /></li>
                    <li><SLink name="Baby Furniture" queryString="?category=baby_furniture" /></li>
                    <li><SLink name="Entryway Furniture" queryString="?category=entryway_furniture" /></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=home_decor"
                        name="Home Decor"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Wall Decor" queryString="?category=wall_decor" /></li>
                    <li><SLink name="Home Accents" queryString="?category=home_accents" /></li>
                    <li><SLink name="Rugs" queryString="?category=rugs" /></li>
                    <li><SLink name="Kitchen" queryString="?category=kitchen" /></li>
                    <li><SLink name="Bath" queryString="?category=bath" /></li>
                    <li><SLink name="Decorative Storage" queryString="?category=decorative_storage" /></li>
                  </ul>
                </li>
              </ul>
            </li>
            
            {/* Classified Ads*/}
            <li>
              <SLink queryString="?category=classified_ads" name="Classified Ads" >
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu first-megamenu">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=funiture"
                        name="Furniture"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Living Room Furniture" queryString="?category=living_room_furniture" /></li>
                    <li><SLink name="Bedroom Furniture" queryString="?category=bedroom_furniture" /></li>
                    <li><SLink name="Kitchen &amp; Dining Furniture" queryString="?category=kitchen_furniture" /></li>
                    <li><SLink name="Home Office Furniture" queryString="?category=home_office_furniture" /></li>
                    <li><SLink name="Baby Furniture" queryString="?category=baby_furniture" /></li>
                    <li><SLink name="Entryway Furniture" queryString="?category=entryway_furniture" /></li>
                  </ul>
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=home_decor"
                        name="Home Decor"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Wall Decor" queryString="?category=wall_decor" /></li>
                    <li><SLink name="Home Accents" queryString="?category=home_accents" /></li>
                    <li><SLink name="Rugs" queryString="?category=rugs" /></li>
                    <li><SLink name="Kitchen" queryString="?category=kitchen" /></li>
                    <li><SLink name="Bath" queryString="?category=bath" /></li>
                    <li><SLink name="Decorative Storage" queryString="?category=decorative_storage" /></li>
                  </ul>
                </li>
              </ul>
            </li>


            {/* Classified Ads*/}
            <li>
              <SLink queryString="?category=classified_ads" name="Furniture &amp; Home Decor" >
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu first-megamenu">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=funiture"
                        name="Furniture"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Living Room Furniture" queryString="?category=living_room_furniture" /></li>
                    <li><SLink name="Bedroom Furniture" queryString="?category=bedroom_furniture" /></li>
                    <li><SLink name="Kitchen &amp; Dining Furniture" queryString="?category=kitchen_furniture" /></li>
                    <li><SLink name="Home Office Furniture" queryString="?category=home_office_furniture" /></li>
                    <li><SLink name="Baby Furniture" queryString="?category=baby_furniture" /></li>
                    <li><SLink name="Entryway Furniture" queryString="?category=entryway_furniture" /></li>
                  </ul>
                  <ul>
                    <li className="menu-tile">
                      <SLink queryString="?category=home_decor"
                        name="Home Decor"
                        customNameClass="menu-tile" />
                    </li>
                    <li><SLink name="Wall Decor" queryString="?category=wall_decor" /></li>
                    <li><SLink name="Home Accents" queryString="?category=home_accents" /></li>
                    <li><SLink name="Rugs" queryString="?category=rugs" /></li>
                    <li><SLink name="Kitchen" queryString="?category=kitchen" /></li>
                    <li><SLink name="Bath" queryString="?category=bath" /></li>
                    <li><SLink name="Decorative Storage" queryString="?category=decorative_storage" /></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <SLink queryString="/wada_biz" name="Wadamart Business" >
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
              <ul className="ht-dropdown megamenu megamenu-two">
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">Gaming Desktops</li>
                    <li><a href="shop.html">Alpha Desktop</a></li>
                    <li><a href="shop.html">rober Desktop</a></li>
                    <li><a href="shop.html">Ultra Desktop </a></li>
                    <li><a href="shop.html">beta desktop</a></li>
                  </ul>
                </li>
                <li className="single-megamenu">
                  <ul>
                    <li className="menu-tile">Women’s Fashion</li>
                    <li><a href="shop.html">3D-Capable</a></li>
                    <li><a href="shop.html">Clearance</a></li>
                    <li><a href="shop.html">Free Shipping Eligible</a></li>
                    <li><a href="shop.html">On Sale</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <SLink queryString="/wada_biz" name="Resources &amp; Blogs">
                <i className="fa fa-angle-right icon-right" aria-hidden="true"></i>
              </SLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default CategoryDropDown