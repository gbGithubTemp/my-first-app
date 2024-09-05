using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        //Get api/city
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            //throw new UnauthorizedAccessException();
            var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);

            //var citiesDto = from c in cities
            //                select new CityDto
            //                {
            //                    Id = c.Id,
            //                    Name = c.Name
            //                };

            return Ok(citiesDto);
        }

        //Post api/city/add?cityname=Miami
        // [HttpPost("add")]
        // [HttpPost("add/{cityname}")]
        // [Route("add")]
        // public async Task<IActionResult> AddCity(string cityName)
        [HttpPost]
        [Route("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City> (cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            //var city = new City
            //{
            //    Name = cityDto.Name,
            //    LastUpdatedBy = 1,
            //    LastUpdatedOn = DateTime.Now
            //};
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
            // return Ok(city);

        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> AddCity(int id, CityDto cityDto)
        {
            if(id != cityDto.Id)
            {
                return BadRequest("Update Now Allowed");
            }
            var cityFromDb = await uow.CityRepository.FindCity(id);
            if(cityFromDb == null)
            {
                return BadRequest("Update Not Allowed");
            }
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            //throw new Exception("Some unknown error occured");
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> AddCity(int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            cityToPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return StatusCode(201);
        }
    }
}
