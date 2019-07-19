import campfire as cf
import pytest

def test_allowed_files():
    assert cf.allowed_file("test.pt")
    assert not cf.allowed_file("oh.exe")
    
