require 'net/http'
require 'net/https'
require 'geocoder'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def about
  end

  def search
  	query = params[:q]
  	url = URI.parse(API_URL + "search?q=#{query}")
  	https = Net::HTTP.new(url.host,url.port)
  	req = Net::HTTP::Get.new(url)
  	https.use_ssl = true
  	req["user-key"] = CONFIG["api_key"]
  	req["Accept"] = "application/json"
  	resp = https.request(req)
  	content =  JSON.parse(resp.body)
  	render json: {
      response: content
     }
  end

	def typeahead
  	render json: Place.where(name: params[:query])
	end

	def typeahead
  	render json: Place.where('name like ?', "%#{params[:query]}%")
	end

  def set_user_city
    session["user_city_id"] = params[:city_id]
    session["user_city"] = params[:city]
    puts @user_city
    render json: {}, :status => "OK"
  end

  def search_restaurant
  end

end
