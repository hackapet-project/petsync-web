import unittest

class TestHarness(unittest.TestCase):

    def _test_harness(self):
        self.assertTrue(True)

    def _test_equal(self):
        self.assertEqual(['foo'], ['foo'])