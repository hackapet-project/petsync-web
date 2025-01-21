import unittest
from django.test import Client

class TestAnimals(unittest.TestCase):
    c = Client()

    def test_get_all_animals(self):
        show_endpoint = '/v1/animals/'
        data = {'age': 10,
       'breed': 'half breed',
       'chip': True,
       'id': 0,
       'name': 'Kika',
       'passport': True}
        expected_result = [data]
        
        response = self.c.get(show_endpoint)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_result)
    # def test_get_animal_given_id(self):
    #     id = 0
    #     index_endpoint = f'/v1/animals/{id}'

    #     response = self.c.get(index_endpoint)

    #     self.assertEqual(response.status_code, 200)

    # def test_get_404_when_no_animal_found(self):
    #     id = 110
    #     index_endpoint = f'/v1/animals/{id}'

    #     response = self.c.get(index_endpoint)

    #     self.assertEqual(response.status_code, 404)