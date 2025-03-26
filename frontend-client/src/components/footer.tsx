export const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094847!2d144.9537363153103!3d-37.81627944202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218cee40!2z44CSMzAwMCBWaWN0b3JpYSwgTWVsYm91cm5lLCDQk9C-0LvQvtCy0YPRgNCw!5e0!3m2!1sru!2sby!4v1700000000000"
            width="100%"
            height="300"
            loading="lazy"
          ></iframe>
        </div>
        <div className="contacts">
          <h2>Контакты</h2>
          <p>Адрес: Ул. Примерная, 123, Минск</p>
          <p>Телефон: +375 29 123 45 67</p>
          <p>Email: example@mail.com</p>
        </div>
      </div>
    </footer>
  );
};
