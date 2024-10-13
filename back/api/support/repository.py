class Repository():
    status =  {'data': [
        {
            'name': 'Kika',
            'age': 10,
            'breed': 'half breed',
            'passport': True,
            'chip': True
        }
    ]}

    @staticmethod
    def show():

        return Repository.status

    @staticmethod
    def create(new_animal):
        Repository.status['data'].append(new_animal)