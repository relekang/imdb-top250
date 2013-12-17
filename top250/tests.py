import unittest

from top250 import server


class TestViews(unittest.TestCase):

    def setUp(self):
        self.app = server.app.test_client()

    def tearDown(self):
        pass

    def assertStatusCode(self, response, expected):
        self.assertEquals(response._status_code, expected)


if __name__ == '__main__':
        unittest.main()
